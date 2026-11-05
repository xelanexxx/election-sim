/**
 * СИНТЕЗАТОР ЗВУКОВ (Web Audio API)
 */
class AudioController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
  }
  tone(freq, type = 'sine', duration = 0.08, vol = 0.1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
  click() { this.tone(350, 'triangle', 0.04, 0.1); }
  cash() {
    this.tone(900, 'sine', 0.06, 0.12);
    setTimeout(() => this.tone(1350, 'sine', 0.09, 0.15), 50);
  }
  alarm() {
    this.tone(480, 'sawtooth', 0.25, 0.15);
    setTimeout(() => this.tone(640, 'sawtooth', 0.25, 0.15), 200);
  }
  stamp() { this.tone(90, 'square', 0.2, 0.25); }
}
const sfx = new AudioController();

/**
 * КОНФИГУРАЦИЯ СТРАН И ТЕХНОЛОГИЙ
 */
const GAME_CONFIG = {
  countries: [
    { id: "russia", name: "Россия", flag: "🇷🇺", party: "«Единая Россия»", targetTurnout: 80, targetVotesPct: 85 },
    { id: "usa", name: "США (Свинг-штат)", flag: "🇺🇸", party: "Комитет штата", targetTurnout: 68, targetVotesPct: 52 },
    { id: "germany", name: "Германия", flag: "🇩🇪", party: "ХДС/ХСС", targetTurnout: 75, targetVotesPct: 40 },
    { id: "france", name: "Франция", flag: "🇫🇷", party: "«Возрождение»", targetTurnout: 72, targetVotesPct: 50.5 }
  ],
  precinctTypes: [
    { type: "school", name: "Школа №", baseLoyalty: 0.85, observers: 1, equip: "Обычные урны" },
    { type: "factory", name: "Заводоуправление №", baseLoyalty: 0.95, observers: 0, equip: "Обычные урны" },
    { type: "hospital", name: "Горбольница №", baseLoyalty: 0.98, observers: 0, equip: "Переносные ящики" },
    { type: "uni", name: "Университет / Общежитие", baseLoyalty: 0.40, observers: 3, equip: "КОИБ-2010" },
    { type: "military", name: "Гарнизон закрытого типа", baseLoyalty: 1.00, observers: 0, equip: "Опечатанные урны" },
    { type: "residential", name: "ДК Микрорайона", baseLoyalty: 0.65, observers: 2, equip: "КОИБ-2017" }
  ],
  techTree: {
    admin: [
      { id: "adm_1", name: "График явки цехов", cost: 800, desc: "Рабочие заводов идут голосовать ровно к 09:00 (+15% скорость привода)" },
      { id: "adm_2", name: "Замена пломб сейф-пакетов", cost: 2200, desc: "Специальный фен для вскрытия пломб без следов (-20% палева от ночных вбросов)" },
      { id: "adm_3", name: "Сводный протокол в ТИК", cost: 6000, desc: "Переписывание данных прямо в территориальной комиссии минуя УИК" }
    ],
    deg: [
      { id: "deg_1", name: "Электронные терминалы (ТЭГ)", cost: 1200, desc: "Внесение голосов без бумажных бюллетеней (+25 бюлл/сек на участках)" },
      { id: "deg_2", name: "Анонимизация блокчейна ДЭГ", cost: 3500, desc: "Внешний аудит видит только зашифрованные хеши (+40% скрытности)" },
      { id: "deg_3", name: "Автогенератор ключа расшифровки", cost: 8500, desc: "Сброс 200,000 электронных голосов в последние 5 минут" }
    ],
    force: [
      { id: "for_1", name: "Операция «Ложное минирование»", cost: 1500, desc: "Эвакуация участка на 30 мин при визите оппозиционных юристов" },
      { id: "for_2", name: "Административные аресты активистов", cost: 3800, desc: "Удаление наблюдателей с участков за нарушение порядка" },
      { id: "for_3", name: "Режим закрытого объекта", cost: 7500, desc: "Полный запрет видеосъемки и прямых трансляций" }
    ]
  }
};

/**
 * СОСТОЯНИЕ СИМУЛЯЦИИ (STATE)
 */
const state = {
  role: "curator", // "curator" или "observer"
  country: GAME_CONFIG.countries[0],
  gameMinutes: 8 * 60, // 08:00
  timeSpeed: 1,
  isPaused: false,
  isGameOver: false,
  
  // Финансы и ресурсы
  fakedVotesTotal: 0,
  corruptionFunds: 1500,
  officialBudget: 10000,
  suspicion: 0,
  
  // Участки округа (16 УИК)
  precincts: [],
  selectedPrecinctId: 1,

  // Прокачка и разведка
  unlockedTechs: [],
  intelQuality: 0.15, // точность соцопросов
  smartVoteIntensity: 0.25, // напор оппозиции

  // Задачи начальства
  activeCall: null,
  callTimerSec: 0,

  // Статистика инцидентов
  incidents: []
};

/**
 * ИНИЦИАЛИЗАЦИЯ УЧАСТКОВ (УИК)
 */
function generatePrecincts() {
  state.precincts = [];
  for (let i = 1; i <= 16; i++) {
    const typeModel = GAME_CONFIG.precinctTypes[i % GAME_CONFIG.precinctTypes.length];
    const totalVoters = 1800 + Math.floor(Math.random() * 800);
    state.precincts.push({
      id: 1400 + i,
      title: `${typeModel.name} ${1400 + i}`,
      typeName: typeModel.type,
      equip: typeModel.equip,
      votersTotal: totalVoters,
      realVoted: Math.floor(totalVoters * 0.08), // явка на утро
      fakedVoted: 0,
      loyalty: typeModel.baseLoyalty,
      observersCount: typeModel.observers,
      powerCut: false,
      sanitized: false,
      smartVoteCandidateVotes: 0,
      govCandidateVotes: 0
    });
  }
}

/**
 * ИГРОВОЙ ЦИКЛ (RAF)
 */
let lastFrameTime = performance.now();

function simulationLoop(now) {
  const dt = (now - lastFrameTime) / 1000;
  lastFrameTime = now;

  if (!state.isPaused && !state.isGameOver) {
    tickSimulation(dt * state.timeSpeed);
  }
  renderUI();
  requestAnimationFrame(simulationLoop);
}

/**
 * ШАГ СИМУЛЯЦИИ ВО ВРЕМЕНИ
 */
function tickSimulation(dtSeconds) {
  // 1 реальная секунда = 1.5 игровых минут
  state.gameMinutes += dtSeconds * 1.5;
  const currentHour = state.gameMinutes / 60;

  // Фазы дня
  updateDayPhase(currentHour);

  // Приток реальных избирателей и оппозиции
  state.precincts.forEach(p => {
    let turnoutSpeed = 0.4;
    // Утренний привод цехов (08:00 - 11:00)
    if (currentHour >= 8 && currentHour < 11) turnoutSpeed = 1.1;
    // Обед и надомники (12:00 - 15:00)
    if (currentHour >= 12 && currentHour < 15) turnoutSpeed = 0.5;
    // Вечерний поток недовольных (17:00 - 20:00)
    if (currentHour >= 17 && currentHour < 20) turnoutSpeed = 1.4;

    const arrived = Math.random() < 0.6 ? Math.floor(turnoutSpeed * dtSeconds * 3) : 0;
    if (p.realVoted + arrived <= p.votersTotal) {
      p.realVoted += arrived;
      // Оппозиция через «Умное голосование» консолидирует протест
      if (Math.random() < state.smartVoteIntensity) {
        p.smartVoteCandidateVotes += arrived;
      } else {
        p.govCandidateVotes += Math.floor(arrived * p.loyalty);
      }
    }
  });

  // Пассивное рассеивание палева
  if (state.suspicion > 0) {
    state.suspicion = Math.max(0, state.suspicion - (0.5 * dtSeconds));
  }

  // Контрудары оппозиции (случайные медиа-бомбы)
  if (Math.random() < 0.003 * dtSeconds * 60) {
    triggerOppositionCounterstrike();
  }

  // Проверка звонка начальства
  if (state.activeCall) {
    state.callTimerSec -= dtSeconds;
    if (state.callTimerSec <= 0) {
      failCallTask();
    }
  } else if (Math.random() < 0.002 * dtSeconds * 60 && currentHour < 19) {
    triggerBossCall();
  }

  // 100% ПАЛЕВА -> СКАНДАЛ И АРЕСТ
  if (state.suspicion >= 100) {
    triggerEndgame(false, "Следственный комитет и наблюдатели вскрыли факты массовых фальсификаций. Кампания сорвана, организаторы арестованы.");
  }

  // Наступление 20:00 -> закрытие участков и подведение итогов
  if (state.gameMinutes >= 20 * 60) {
    finishElectionDay();
  }
}

function updateDayPhase(hour) {
  const badge = document.getElementById("dayPhaseBadge");
  if (hour < 11) {
    badge.textContent = "ФАЗА: УТРЕННИЙ ПРИВОД БЮДЖЕТНИКОВ";
  } else if (hour < 16) {
    badge.textContent = "ФАЗА: НАДОМНОЕ ГОЛОСОВАНИЕ И ОБЕД";
  } else if (hour < 20) {
    badge.textContent = "ФАЗА: ВЕЧЕРНИЙ НАПЛЫВ ОППОЗИЦИИ";
  } else {
    badge.textContent = "ФАЗА: НОЧНОЙ ПОДСЧЕТ И СДАЧА ПРОТОКОЛОВ";
  }
}

/**
 * КОНТРУДАРЫ ОППОЗИЦИИ (МЕДИА-БОМБЫ, ИСКИ)
 */
function triggerOppositionCounterstrike() {
  const events = [
    { text: "Канал оппозиции выпустил расследование о каруселях! Палево +18%", sus: 18 },
    { text: "Юристы штаба подали 30 жалоб в ЦИК на несовпадение явки! Палево +12%", sus: 12 },
    { text: "На УИК №1404 прибыл десант независимых журналистов! Наблюдатели +2", sus: 8, pId: 1404 }
  ];
  const ev = events[Math.floor(Math.random() * events.length)];
  state.suspicion = Math.min(100, state.suspicion + ev.sus);
  if (ev.pId) {
    const p = state.precincts.find(x => x.id === ev.pId);
    if (p) p.observersCount += 2;
  }
  addLog(ev.text, "alarm");
  sfx.alarm();
}

/**
 * ЗВОНОК НАЧАЛЬСТВА (ДИСПЕТЧЕРСКИЕ ЗАДАЧИ)
 */
function triggerBossCall() {
  const targetPrecinct = state.precincts[Math.floor(Math.random() * state.precincts.length)];
  state.activeCall = {
    precinctId: targetPrecinct.id,
    targetTurnoutPct: 75,
    rewardCash: 4000
  };
  state.callTimerSec = 90;

  document.getElementById("callSpeaker").textContent = "Куратор Внутренней Политики";
  document.getElementById("callMessage").textContent = 
    `«На УИК №${targetPrecinct.id} недопустимо низкая активность! Требую поднять явку до 75% за отведенное время, иначе готовь объяснительную прокурору.»`;
  document.getElementById("callModal").classList.remove("hidden");
  sfx.alarm();
}

function failCallTask() {
  state.activeCall = null;
  state.suspicion = Math.min(100, state.suspicion + 25);
  addLog("Задание куратора провалено! Выговор и +25% к палеву.", "alarm");
}

/**
 * ПОДВЕДЕНИЕ ИТОГОВ ВЫБОРОВ В 20:00
 */
function finishElectionDay() {
  state.isGameOver = true;
  let totalVoters = 0;
  let totalReported = 0;
  let totalGov = 0;
  let totalReal = 0;

  state.precincts.forEach(p => {
    totalVoters += p.votersTotal;
    const reportedTurnout = p.realVoted + p.fakedVoted;
    totalReported += reportedTurnout;
    totalGov += p.govCandidateVotes + p.fakedVoted;
    totalReal += p.realVoted;
  });

  const officialPct = (totalGov / totalReported) * 100;
  const targetPct = state.country.targetVotesPct;

  if (state.role === "curator") {
    if (officialPct >= targetPct) {
      triggerEndgame(true, `План выполнен: партия набрала ${officialPct.toFixed(1)}% при явке ${((totalReported/totalVoters)*100).toFixed(1)}%. Протоколы подписаны без нареканий.`);
    } else {
      triggerEndgame(false, `Провал: партия власти набрала лишь ${officialPct.toFixed(1)}% (требовалось ${targetPct}%). Куратор отстранен от должности.`);
    }
  } else {
    // Режим наблюдателя
    if (state.suspicion >= 60 || officialPct < targetPct) {
      triggerEndgame(true, `Честность отстояна! Благодаря актам и фиксации нарушений сфальсифицировать итоги не удалось.`);
    } else {
      triggerEndgame(false, `Махинаторы победили: итоговый протокол сфальсифицирован на уровне ${officialPct.toFixed(1)}%.`);
    }
  }
}

function triggerEndgame(isVictory, narrative) {
  const modal = document.getElementById("endgameModal");
  const card = document.getElementById("endgameCard");
  const stamp = document.getElementById("endgameStamp");

  sfx.stamp();
  modal.classList.remove("hidden");

  let totalReported = 0, totalGov = 0, totalReal = 0;
  state.precincts.forEach(p => {
    totalReported += p.realVoted + p.fakedVoted;
    totalGov += p.govCandidateVotes + p.fakedVoted;
    totalReal += p.realVoted;
  });

  document.getElementById("endStatOfficial").textContent = `${((totalGov / totalReported) * 100).toFixed(1)}%`;
  document.getElementById("endStatReal").textContent = `${((totalReal / totalReported) * 100).toFixed(1)}%`;
  document.getElementById("endStatFake").textContent = `${state.fakedVotesTotal.toLocaleString()} бюлл.`;
  document.getElementById("endStatCash").textContent = `$${Math.floor(state.corruptionFunds).toLocaleString()}`;
  document.getElementById("newsPaperBody").textContent = narrative;

  if (isVictory) {
    card.className = "endgame-card";
    stamp.textContent = "ПОБЕДА УТВЕРЖДЕНА";
    document.getElementById("endgameTitle").textContent = "ЦЕЛЬ КАМПАНИИ ДОСТИГНУТА";
  } else {
    card.className = "endgame-card defeat";
    stamp.textContent = "ПОРАЖЕНИЕ / СКАНДАЛ";
    document.getElementById("endgameTitle").textContent = "ПРОВАЛ И РАЗОБЛАЧЕНИЕ";
  }
}

/**
 * ИСТОЧНИКИ ЗАРАБОТКА ТЕНЕВОГО КЭША
 */
function setupCashEarningButtons() {
  document.getElementById("btnEmbezzleBudget").addEventListener("click", () => {
    if (state.officialBudget >= 1000) {
      state.officialBudget -= 1000;
      state.corruptionFunds += 800;
      state.suspicion = Math.min(100, state.suspicion + 3);
      sfx.cash();
      addLog("Распил госбюджета: -$1000 фонда ➔ +$800 кэша (+3% палева)", "success");
    }
  });

  document.getElementById("btnOligarchDonation").addEventListener("click", () => {
    state.corruptionFunds += 2500;
    state.suspicion = Math.min(100, state.suspicion + 7);
    sfx.cash();
    addLog("Транш от олигарха: получено +$2,500 в теневой фонд (+7% палева)", "success");
  });

  document.getElementById("btnMunicipalTender").addEventListener("click", () => {
    state.corruptionFunds += 5000;
    state.suspicion = Math.min(100, state.suspicion + 14);
    sfx.cash();
    addLog("Тендер на замену бордюров закрыт: получено +$5,000 (+14% палева)", "success");
  });

  document.getElementById("btnShakedownBusiness").addEventListener("click", () => {
    state.corruptionFunds += 1200;
    state.suspicion = Math.min(100, state.suspicion + 8);
    sfx.cash();
    addLog("Проверки торговых точек: собрано +$1,200 наличными (+8% палева)", "success");
  });
}

/**
 * ТЕЛЕФОННАЯ КНИГА СВЯЗЕЙ
 */
function setupRolodex() {
  document.querySelectorAll(".btn-call").forEach(btn => {
    btn.addEventListener("click", () => {
      const contact = btn.dataset.contact;
      sfx.click();

      if (contact === "admin" && state.corruptionFunds >= 3000) {
        state.corruptionFunds -= 3000;
        state.suspicion = Math.max(0, state.suspicion - 25);
        addLog("Звонок в Администрацию: закрыты прокурорские проверки (-25% палева)");
      } else if (contact === "police" && state.corruptionFunds >= 1200) {
        state.corruptionFunds -= 1200;
        const cur = getSelectedPrecinct();
        cur.observersCount = Math.max(0, cur.observersCount - 2);
        addLog(`Наряд РОВД удалил 2 наблюдателей с УИК №${cur.id}`);
      } else if (contact === "hospital" && state.corruptionFunds >= 800) {
        state.corruptionFunds -= 800;
        const cur = getSelectedPrecinct();
        cur.fakedVoted += 250;
        state.fakedVotesTotal += 250;
        addLog(`Переносная урна из больницы привезла +250 голосов на УИК №${cur.id}`);
      } else if (contact === "bus" && state.corruptionFunds >= 1500) {
        state.corruptionFunds -= 1500;
        state.precincts.forEach(p => {
          if (p.loyalty > 0.7) {
            p.fakedVoted += 60;
            state.fakedVotesTotal += 60;
          }
        });
        state.suspicion = Math.min(100, state.suspicion + 9);
        addLog("Колонна карусельщиков объехала лояльные участки (+60 бюлл. на каждый)");
      }
    });
  });
}

/**
 * ИНСПЕКТОР И ДЕЙСТВИЯ НА ВЫБРАННОМ УИК
 */
function getSelectedPrecinct() {
  return state.precincts.find(p => p.id === state.selectedPrecinctId) || state.precincts[0];
}

function setupPrecinctInspectorActions() {
  const container = document.getElementById("inspActionButtons");
  container.querySelectorAll(".btn-insp").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.action;
      const p = getSelectedPrecinct();
      sfx.click();

      if (act === "bribeChair" && state.corruptionFunds >= 400) {
        state.corruptionFunds -= 400;
        p.loyalty = Math.min(1.0, p.loyalty + 0.15);
        addLog(`Председатель УИК №${p.id} взял конверт. Лояльность повышена до ${(p.loyalty*100).toFixed(0)}%`);
      } else if (act === "deployObserver" && state.corruptionFunds >= 300) {
        state.corruptionFunds -= 300;
        p.observersCount += 1;
        addLog(`На УИК №${p.id} направлен свой наблюдатель`);
      } else if (act === "cutPower" && state.corruptionFunds >= 500) {
        state.corruptionFunds -= 500;
        p.powerCut = true;
        p.fakedVoted += 200;
        state.fakedVotesTotal += 200;
        state.suspicion = Math.min(100, state.suspicion + 8);
        addLog(`На УИК №${p.id} выбило пробки: за 15 мин темноты вброшено +200 бюллетеней`);
      } else if (act === "sanitize" && state.corruptionFunds >= 350) {
        state.corruptionFunds -= 350;
        p.sanitized = true;
        state.suspicion = Math.max(0, state.suspicion - 10);
        addLog(`УИК №${p.id} закрыт на санобработку. Наблюдатели выставлены на улицу`);
      } else if (act === "instantDrop") {
        const added = 150;
        p.fakedVoted += added;
        state.fakedVotesTotal += added;
        const addedSus = (added * 0.1) * (p.observersCount + 1);
        state.suspicion = Math.min(100, state.suspicion + addedSus);
        addLog(`Точечный вброс пачки на УИК №${p.id}: +${added} голосов`);
      }
    });
  });
}

/**
 * МИНИ-ИГРА: «ВБРОС В ЩЕЛЬ ПОКА НАБЛЮДАТЕЛЬ ОТВЕРНУЛСЯ»
 */
let minigameInterval = null;
let isHoldingMinigame = false;
let observerWatchLevel = 0; // 0 (безопасно) до 100 (смотрит прямо)
let miniSuccessCount = 0;

function setupMinigame() {
  const btnOpen = document.getElementById("btnStartMinigame");
  const modal = document.getElementById("minigameModal");
  const btnClose = document.getElementById("btnCloseMinigame");
  const holdBtn = document.getElementById("btnHoldDrop");

  btnOpen.addEventListener("click", () => {
    modal.classList.remove("hidden");
    miniSuccessCount = 0;
    observerWatchLevel = 10;
    isHoldingMinigame = false;
    document.getElementById("miniSuccessCount").textContent = "0";
    document.getElementById("miniRiskPct").textContent = "0%";

    clearInterval(minigameInterval);
    minigameInterval = setInterval(tickMinigameLogic, 100);
  });

  btnClose.addEventListener("click", () => {
    modal.classList.add("hidden");
    clearInterval(minigameInterval);
  });

  const startHold = () => { isHoldingMinigame = true; };
  const endHold = () => { isHoldingMinigame = false; };

  holdBtn.addEventListener("mousedown", startHold);
  holdBtn.addEventListener("mouseup", endHold);
  holdBtn.addEventListener("mouseleave", endHold);
  holdBtn.addEventListener("touchstart", startHold);
  holdBtn.addEventListener("touchend", endHold);
}

function tickMinigameLogic() {
  // Наблюдатель периодически переводит взгляд
  observerWatchLevel += (Math.random() * 16) - 7;
  observerWatchLevel = Math.max(0, Math.min(100, observerWatchLevel));

  const fill = document.getElementById("visionFill");
  const text = document.getElementById("visionStateText");
  fill.style.width = `${observerWatchLevel}%`;

  if (observerWatchLevel > 65) {
    fill.style.backgroundColor = "#ef4444";
    text.textContent = "СМОТРИТ ПРЯМО НА УРНУ! (ОПАСНОСТЬ)";
    text.className = "vision-state danger";
  } else {
    fill.style.backgroundColor = "#10b981";
    text.textContent = "ОТВЛЕКСЯ В ТЕЛЕФОН / ПЬЕТ ЧАЙ (БЕЗОПАСНО)";
    text.className = "vision-state safe";
  }

  // Если игрок зажал кнопку
  if (isHoldingMinigame) {
    sfx.click();
    miniSuccessCount++;
    document.getElementById("miniSuccessCount").textContent = miniSuccessCount;
    document.getElementById("ballotStackVisual").style.transform = `translateY(${miniSuccessCount * 2}px)`;

    // Если вбросил прямо под взглядом наблюдателя
    if (observerWatchLevel > 65) {
      state.suspicion = Math.min(100, state.suspicion + 30);
      sfx.alarm();
      document.getElementById("minigameModal").classList.add("hidden");
      clearInterval(minigameInterval);
      addLog("ВАС ПОЙМАЛИ ЗА РУКУ НА ВБРОСЕ! Скандал и +30% к палеву!", "alarm");
      return;
    }

    if (miniSuccessCount >= 20) {
      // Успех операции
      const p = getSelectedPrecinct();
      p.fakedVoted += 350;
      state.fakedVotesTotal += 350;
      sfx.cash();
      document.getElementById("minigameModal").classList.add("hidden");
      clearInterval(minigameInterval);
      addLog(`Спецоперация удалась: +350 бюллетеней без шума вброшено на УИК №${p.id}!`, "success");
    }
  }
}

/**
 * ДЕРЕВО ТЕХНОЛОГИЙ (ПРОКАЧКА)
 */
function renderTechTree(tabName = "admin") {
  const container = document.getElementById("techBranchContainer");
  const list = GAME_CONFIG.techTree[tabName] || [];
  container.innerHTML = list.map(tech => {
    const isBought = state.unlockedTechs.includes(tech.id);
    return `
      <div class="tech-item ${!isBought ? '' : 'bought'}">
        <div class="tech-info">
          <span class="tech-title">${tech.name}</span>
          <span class="tech-desc">${tech.desc}</span>
        </div>
        <button class="btn-buy-tech ${isBought ? 'purchased' : ''}" 
                ${isBought ? 'disabled' : ''} 
                data-id="${tech.id}" data-cost="${tech.cost}">
          ${isBought ? 'Изучено ✓' : `$${tech.cost}`}
        </button>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".btn-buy-tech:not([disabled])").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const cost = parseInt(btn.dataset.cost);
      if (state.corruptionFunds >= cost) {
        state.corruptionFunds -= cost;
        state.unlockedTechs.push(id);
        sfx.cash();
        addLog(`Изучена технология: ${id}`, "success");
        renderTechTree(tabName);
      }
    });
  });
}

function setupTechTreeTabs() {
  document.querySelectorAll(".tree-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tree-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTechTree(btn.dataset.tab);
    });
  });
}

/**
 * ТУМАН ВОЙНЫ И РАЗВЕДКА
 */
function setupIntelButtons() {
  document.getElementById("btnBuyPoll").addEventListener("click", () => {
    if (state.corruptionFunds >= 600) {
      state.corruptionFunds -= 600;
      state.intelQuality = Math.min(1.0, state.intelQuality + 0.35);
      sfx.cash();
      addLog("Куплен закрытый социологический замер: точность выросла");
    }
  });

  document.getElementById("btnWiretapOpposition").addEventListener("click", () => {
    if (state.corruptionFunds >= 1400) {
      state.corruptionFunds -= 1400;
      state.smartVoteIntensity = Math.max(0.1, state.smartVoteIntensity - 0.12);
      sfx.cash();
      addLog("Штаб оппозиции поставлен на прослушку: скоординированность снижена");
    }
  });
}

/**
 * ОТРИСОВКА ДИАГРАММЫ ШПИЛЬКИНА (CANVAS)
 */
function renderShpilkinChart() {
  const canvas = document.getElementById("shpilkinChartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Оси координат и сетка
  ctx.strokeStyle = "#1b253b";
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  let totalAnomalyDistance = 0;

  // Нанесение точек участков
  state.precincts.forEach(p => {
    const totalReported = p.realVoted + p.fakedVoted;
    const turnoutPct = (totalReported / p.votersTotal) * 100;
    const govPct = totalReported > 0 ? ((p.govCandidateVotes + p.fakedVoted) / totalReported) * 100 : 0;

    const cx = (turnoutPct / 100) * w;
    const cy = h - ((govPct / 100) * h);

    // Расчет коэффициента аномальности ("хвост Шпилькина")
    const isAnomaly = turnoutPct > 75 && govPct > 75;
    if (isAnomaly) totalAnomalyDistance += (turnoutPct - 70);

    ctx.beginPath();
    ctx.arc(cx, cy, isAnomaly ? 4.5 : 3, 0, Math.PI * 2);
    ctx.fillStyle = isAnomaly ? "#ef4444" : "#38bdf8";
    ctx.fill();
  });

  const badge = document.getElementById("shpilkinStatusBadge");
  const score = document.getElementById("shpilkinTailScore");
  const anomalyScore = (totalAnomalyDistance / 10).toFixed(1);
  score.textContent = `Индекс аномальности: ${anomalyScore}`;

  if (totalAnomalyDistance > 80) {
    badge.textContent = "Аномалия: «Хвост Шпилькина»";
    badge.className = "status-pill red";
  } else {
    badge.textContent = "Норма: Колокол Гаусса";
    badge.className = "status-pill green";
  }
}

/**
 * ОТРИСОВКА КАРТЫ УЧАСТКОВ
 */
function renderPrecinctsGrid() {
  const container = document.getElementById("precinctsGrid");
  container.innerHTML = state.precincts.map(p => {
    const totalReported = p.realVoted + p.fakedVoted;
    const turnoutPct = ((totalReported / p.votersTotal) * 100).toFixed(0);
    const isSelected = p.id === state.selectedPrecinctId;
    const isAlert = p.observersCount >= 3 || p.fakedVoted > 400;

    return `
      <div class="precinct-node ${isSelected ? 'selected' : ''} ${isAlert ? 'alert' : ''}" data-id="${p.id}">
        <div class="p-header">
          <span>№${p.id}</span>
          <span>${turnoutPct}%</span>
        </div>
        <div class="p-type">${p.title}</div>
        <div class="p-bar-track">
          <div class="p-bar-fill" style="width: ${turnoutPct}%"></div>
        </div>
        <div class="p-badges-row">
          <span class="p-pill">👁️ ${p.observersCount}</span>
          <span class="p-pill">🗳️ ${p.fakedVoted}</span>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".precinct-node").forEach(node => {
    node.addEventListener("click", () => {
      state.selectedPrecinctId = parseInt(node.dataset.id);
      sfx.click();
      renderPrecinctInspector();
      renderPrecinctsGrid();
    });
  });
}

function renderPrecinctInspector() {
  const p = getSelectedPrecinct();
  document.getElementById("inspTitle").textContent = p.title;
  document.getElementById("inspTypeBadge").textContent = p.typeName.toUpperCase();
  document.getElementById("inspLoyalty").textContent = `${(p.loyalty * 100).toFixed(0)}%`;
  document.getElementById("inspObservers").textContent = `${p.observersCount} чел.`;
  document.getElementById("inspVotersTotal").textContent = p.votersTotal.toLocaleString();
  document.getElementById("inspRealVoted").textContent = p.realVoted.toLocaleString();
  document.getElementById("inspFakeVoted").textContent = `+${p.fakedVoted.toLocaleString()}`;
  document.getElementById("inspEquipment").textContent = p.equip;
}

/**
 * ЛОГ ИНЦИДЕНТОВ
 */
function addLog(msg, type = "normal") {
  const log = document.getElementById("incidentLog");
  const row = document.createElement("div");
  const timeStr = formatGameTime();
  row.className = `log-row ${type}`;
  row.textContent = `[${timeStr}] ${msg}`;
  log.prepend(row);
  if (log.children.length > 30) log.lastChild.remove();
}

function formatGameTime() {
  const hrs = Math.floor(state.gameMinutes / 60) % 24;
  const mins = Math.floor(state.gameMinutes % 60);
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * ОБНОВЛЕНИЕ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА (UI RENDER)
 */
function renderUI() {
  // Таймер
  document.getElementById("clockDisplay").textContent = formatGameTime();

  // Финансы
  document.getElementById("metricVotesVal").textContent = state.fakedVotesTotal.toLocaleString();
  document.getElementById("metricCashVal").textContent = `$${Math.floor(state.corruptionFunds).toLocaleString()}`;
  document.getElementById("metricBudgetVal").textContent = `$${Math.floor(state.officialBudget).toLocaleString()}`;

  // Шкала палева
  const sBar = document.getElementById("suspicionBar");
  sBar.style.width = `${state.suspicion}%`;
  document.getElementById("suspicionVal").textContent = `${Math.round(state.suspicion)}%`;
  sBar.style.backgroundColor = state.suspicion < 45 ? "var(--success)" : (state.suspicion < 75 ? "var(--warning)" : "var(--danger)");

  // Статус округа
  let sumVoters = 0, sumReal = 0, sumReported = 0, sumSmart = 0;
  state.precincts.forEach(p => {
    sumVoters += p.votersTotal;
    sumReal += p.realVoted;
    sumReported += p.realVoted + p.fakedVoted;
    sumSmart += p.smartVoteCandidateVotes;
  });

  document.getElementById("uiProcessedPrecincts").textContent = `${state.precincts.filter(p => p.realVoted > 100).length} / 16`;
  document.getElementById("uiOfficialTurnout").textContent = `${((sumReported / sumVoters) * 100).toFixed(1)}%`;
  document.getElementById("uiRealTurnout").textContent = `${((sumReal / sumVoters) * 100).toFixed(1)}%`;
  document.getElementById("uiSmartVoteShare").textContent = `${((sumSmart / sumReal) * 100 || 0).toFixed(1)}%`;

  // Разведка
  if (state.intelQuality < 0.4) {
    document.getElementById("intelExitPoll").textContent = "ДАННЫЕ ЗАСЕКРЕЧЕНЫ";
    document.getElementById("intelMargin").textContent = "±18.5%";
  } else {
    const est = ((sumReal / sumVoters) * 100).toFixed(1);
    document.getElementById("intelExitPoll").textContent = `Оценка явки: ${est}%`;
    document.getElementById("intelMargin").textContent = `±${((1 - state.intelQuality) * 15).toFixed(1)}%`;
  }

  // Отрисовка графиков и инспектора
  renderShpilkinChart();
  renderPrecinctInspector();
}

/**
 * ИНИЦИАЛИЗАЦИЯ И СЛУШАТЕЛИ СОБЫТИЙ
 */
document.addEventListener("DOMContentLoaded", () => {
  generatePrecincts();
  setupCashEarningButtons();
  setupRolodex();
  setupPrecinctInspectorActions();
  setupMinigame();
  setupTechTreeTabs();
  setupIntelButtons();
  renderTechTree("admin");
  renderPrecinctsGrid();

  // Выбор страны в стартовой модалке
  const pillsBox = document.getElementById("countryPills");
  pillsBox.innerHTML = GAME_CONFIG.countries.map(c => `
    <button class="country-pill-btn ${c.id === state.country.id ? 'selected' : ''}" data-id="${c.id}">
      ${c.flag} ${c.name}
    </button>
  `).join("");

  pillsBox.querySelectorAll(".country-pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      pillsBox.querySelectorAll(".country-pill-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.country = GAME_CONFIG.countries.find(x => x.id === btn.dataset.id);
    });
  });

  // Выбор роли (Куратор / Наблюдатель)
  document.querySelectorAll(".role-card").forEach(rc => {
    rc.addEventListener("click", () => {
      document.querySelectorAll(".role-card").forEach(c => c.classList.remove("selected"));
      rc.classList.add("selected");
      state.role = rc.dataset.role;
    });
  });

  // Кнопка запуска игры
  document.getElementById("btnLaunchGame").addEventListener("click", () => {
    document.getElementById("startModal").classList.add("hidden");
    document.getElementById("countryFlag").textContent = state.country.flag;
    document.getElementById("countryName").textContent = state.country.name;
    document.getElementById("partyName").textContent = state.country.party;
    document.getElementById("roleBadge").textContent = state.role === "curator" ? "РЕЖИМ: КУРАТОР" : "РЕЖИМ: НАБЛЮДАТЕЛЬ";
    
    if (state.role === "observer") {
      document.getElementById("primaryMetricTitle").textContent = "Жалобы в ЦИК";
      document.getElementById("suspicionLabel").textContent = "ДАВЛЕНИЕ СИЛОВИКОВ";
    }

    addLog(`Кампания открыта в юрисдикции: ${state.country.name}. Время 08:00, участки открыты.`);
  });

  // Управление скоростью времени
  document.querySelectorAll(".btn-speed[data-speed]").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".btn-speed[data-speed]").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      state.timeSpeed = parseInt(b.dataset.speed);
      state.isPaused = false;
    });
  });

  document.getElementById("btnPauseToggle").addEventListener("click", () => {
    state.isPaused = !state.isPaused;
    document.getElementById("btnPauseToggle").textContent = state.isPaused ? "▶" : "⏸";
  });

  // Звук
  document.getElementById("btnSoundToggle").addEventListener("click", () => {
    sfx.enabled = !sfx.enabled;
    document.getElementById("btnSoundToggle").textContent = sfx.enabled ? "🔊" : "🔇";
  });

  // Смена роли / Перезапуск
  document.getElementById("btnSwitchSide").addEventListener("click", () => {
    state.role = state.role === "curator" ? "observer" : "curator";
    document.getElementById("roleBadge").textContent = state.role === "curator" ? "РЕЖИМ: КУРАТОР" : "РЕЖИМ: НАБЛЮДАТЕЛЬ";
    sfx.click();
    addLog(`Роль изменена на: ${state.role === "curator" ? "Куратор" : "Наблюдатель"}`);
  });

  document.getElementById("btnNewCampaign").addEventListener("click", () => location.reload());
  document.getElementById("btnRestartCampaign").addEventListener("click", () => location.reload());

  // Бегущая строка
  document.getElementById("tickerTrack").innerHTML = `
    <span>В стране открылись свыше 90 тысяч избирательных участков</span>
    <span>ЦИК сообщает о штатной работе систем видеонаблюдения и КОИБ</span>
    <span>Независимые штабы развернули ситуационные центры мониторинга</span>
  `;

  // Ответ на звонок начальства
  document.getElementById("btnAcceptCallTask").addEventListener("click", () => {
    document.getElementById("callModal").classList.add("hidden");
    state.corruptionFunds += 4000;
    addLog("Распоряжение куратора принято в работу. Выделен аванс +$4,000", "success");
  });

  document.getElementById("btnDeclineCallTask").addEventListener("click", () => {
    document.getElementById("callModal").classList.add("hidden");
    failCallTask();
  });

  // Запуск игрового цикла
  requestAnimationFrame(simulationLoop);
});