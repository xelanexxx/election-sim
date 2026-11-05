/**
 * КОНФИГУРАЦИЯ СТРАН, ПАРТИЙ И МАГАЗИНА УЛУЧШЕНИЙ
 */
const CONFIG = {
  countries: {
    usa: {
      id: "usa",
      name: "США",
      flag: "🇺🇸",
      systemName: "Коллегия выборщиков",
      description: "Победитель забирает всё в каждом штате. Для победы требуется 270 выборщиков.",
      victoryCondition: "Набрать 270 выборщиков через контроль колеблющихся штатов.",
      parties: [
        {
          id: "usa_checks",
          name: "Партия Бесконечных Чеков",
          icon: "💵",
          color: "#10b981",
          buffs: { voteMultiplier: 1.25, stealthMultiplier: 0.90, kickbackMultiplier: 1.40 },
          desc: "Решает любые вопросы за счет лоббизма и щедрых откатов."
        },
        {
          id: "usa_drones",
          name: "Ястребы Ипотечного Дрона",
          icon: "🦅",
          color: "#3b82f6",
          buffs: { voteMultiplier: 1.40, stealthMultiplier: 0.80, kickbackMultiplier: 1.00 },
          desc: "Агрессивная мобилизация электората под лозунгами внешней безопасности."
        },
        {
          id: "usa_tech",
          name: "Техно-Олигархат Марса",
          icon: "🚀",
          color: "#ef4444",
          buffs: { voteMultiplier: 1.10, stealthMultiplier: 1.35, kickbackMultiplier: 0.80 },
          desc: "Алгоритмы соцсетей обеспечивают высочайший уровень скрытности."
        }
      ]
    },
    russia: {
      id: "russia",
      name: "Россия",
      flag: "🇷🇺",
      systemName: "Супербольшинство",
      description: "Требуется набрать 5 000 000 голосов и удержать долю 85%+ против прироста у ботов.",
      victoryCondition: "Собрать 5 млн голосов с долей 85%+ к закрытию участков.",
      parties: [
        {
          id: "ru_stability",
          name: "Единый Стабилитет",
          icon: "🐻",
          color: "#2563eb",
          buffs: { voteMultiplier: 1.50, stealthMultiplier: 0.75, kickbackMultiplier: 1.30 },
          desc: "Тяжелый административный ресурс: вбросы огромны, но привлекают внимание."
        },
        {
          id: "ru_budget",
          name: "Честный Бюджетник",
          icon: "📋",
          color: "#dc2626",
          buffs: { voteMultiplier: 1.20, stealthMultiplier: 1.20, kickbackMultiplier: 0.90 },
          desc: "Корпоративная дисциплина без лишнего публичного шума."
        },
        {
          id: "ru_curbs",
          name: "Союз Реновации и Бордюров",
          icon: "🚜",
          color: "#d97706",
          buffs: { voteMultiplier: 1.10, stealthMultiplier: 1.00, kickbackMultiplier: 1.60 },
          desc: "Масштабные сметы приносят максимальный объем откатов."
        }
      ]
    },
    germany: {
      id: "germany",
      name: "Германия",
      flag: "🇩🇪",
      systemName: "Парламент и Коалиция",
      description: "Голоса дают места в Бундестаге. Недостающие мандаты докупаются за откаты.",
      victoryCondition: "Сформировать коалицию из 301+ кресла через голоса и выкуп партий.",
      parties: [
        {
          id: "de_ordnung",
          name: "Бюрократический Орднунг",
          icon: "📂",
          color: "#64748b",
          buffs: { voteMultiplier: 1.00, stealthMultiplier: 1.45, kickbackMultiplier: 0.90 },
          desc: "Бюрократические формуляры скрывают несоответствия в подсчетах."
        },
        {
          id: "de_green",
          name: "Зелёный Карбоновый Налог",
          icon: "🥦",
          color: "#16a34a",
          buffs: { voteMultiplier: 1.20, stealthMultiplier: 1.15, kickbackMultiplier: 1.00 },
          desc: "Стабильный электорат с выверенным профилем."
        },
        {
          id: "de_autobahn",
          name: "Союз Автобанов и Дизеля",
          icon: "🏎️",
          color: "#ca8a04",
          buffs: { voteMultiplier: 1.35, stealthMultiplier: 0.85, kickbackMultiplier: 1.25 },
          desc: "Промышленное лобби гарантирует солидный кэш."
        }
      ]
    },
    france: {
      id: "france",
      name: "Франция",
      flag: "🇫🇷",
      systemName: "Два тура",
      description: "Квалификация в 1-м туре и прямое процентное перетягивание каната во 2-м туре.",
      victoryCondition: "Выйти во 2-й тур и победить 1 на 1 против искусственного интеллекта.",
      parties: [
        {
          id: "fr_strike",
          name: "Синдикат Бесконечной Забастовки",
          icon: "🥐",
          color: "#b91c1c",
          buffs: { voteMultiplier: 1.30, stealthMultiplier: 0.85, kickbackMultiplier: 1.10 },
          desc: "Уличная активность мгновенно сдвигает чашу весов."
        },
        {
          id: "fr_wine",
          name: "Клуб Божоле и Ренессанса",
          icon: "🍷",
          color: "#7c3aed",
          buffs: { voteMultiplier: 1.10, stealthMultiplier: 1.10, kickbackMultiplier: 1.40 },
          desc: "Связи и закрытые приемы генерируют солидный теневой бюджет."
        },
        {
          id: "fr_vest",
          name: "Движение Умеренного Возмущения",
          icon: "🦺",
          color: "#eab308",
          buffs: { voteMultiplier: 1.45, stealthMultiplier: 0.70, kickbackMultiplier: 0.95 },
          desc: "Массовый приток голосов ценой быстрого роста палева."
        }
      ]
    },
    uk: {
      id: "uk",
      name: "Великобритания",
      flag: "🇬🇧",
      systemName: "Мажоритарные округа (FPTP)",
      description: "10 округов. Необходимо вручную переключать вбросы, лидируя минимум в 6 из них.",
      victoryCondition: "Удержать большинство минимум в 6 округах одновременно.",
      parties: [
        {
          id: "uk_tea",
          name: "Джентльмены Чайного Фонда",
          icon: "☕",
          color: "#1e3a8a",
          buffs: { voteMultiplier: 1.10, stealthMultiplier: 1.30, kickbackMultiplier: 1.25 },
          desc: "Традиционная невозмутимость снижает подозрительность комиссий."
        },
        {
          id: "uk_offshore",
          name: "Лорды Офшорного Тумана",
          icon: "🎩",
          color: "#0f766e",
          buffs: { voteMultiplier: 1.20, stealthMultiplier: 1.25, kickbackMultiplier: 1.35 },
          desc: "Мастера офшорных схем и скрытого распределения ресурсов."
        },
        {
          id: "uk_tabloid",
          name: "Гильдия Желтых Таблоидов",
          icon: "📰",
          color: "#e11d48",
          buffs: { voteMultiplier: 1.40, stealthMultiplier: 0.75, kickbackMultiplier: 1.00 },
          desc: "Шумная кампания штампует голоса, но привлекает скандалы."
        }
      ]
    }
  },

  // Шаг 4: Дерево улучшений для магазина
  upgrades: {
    // Вкладка 1: Махинации (Покупаются за fakedVotes)
    machinations: [
      {
        id: "dropper_1",
        name: "Ручной карусельщик",
        icon: "🚶",
        type: "dropper",
        cost: 50,
        effectValue: 2, // +2 голоса/сек
        desc: "Подвозит группы проверенных избирателей на микроавтобусе (+2 бюлл./сек)."
      },
      {
        id: "dropper_2",
        name: "Студенческий рейд",
        icon: "🎓",
        type: "dropper",
        cost: 250,
        effectValue: 8, // +8 голосов/сек
        desc: "Организованный десант общежитий с готовыми бюллетенями (+8 бюлл./сек)."
      },
      {
        id: "upgrader_1",
        name: "Копировальный лоток",
        icon: "🖨️",
        type: "upgrader",
        cost: 800,
        effectValue: 1.35, // множитель клика и дохода
        desc: "Умножающие ворота на конвейере: увеличивает ценность каждого бюллетеня на +35%."
      },
      {
        id: "dropper_3",
        name: "Пневмопочта из депо",
        icon: "📦",
        type: "dropper",
        cost: 2500,
        effectValue: 35, // +35 голосов/сек
        desc: "Прямой пневматический спавнер бюллетеней прямо в дно стационарной урны (+35 бюлл./сек)."
      },
      {
        id: "upgrader_2",
        name: "Нейросетевая роспись",
        icon: "🤖",
        type: "upgrader",
        cost: 7500,
        effectValue: 1.60,
        desc: "ИИ подделывает подписи в списках избирателей: дает +60% к мощности конвейера."
      }
    ],

    // Вкладка 2: Конспирация (Покупаются за corruptionFunds)
    conspiracy: [
      {
        id: "stealth_1",
        name: "Плотные шторы на урны",
        icon: "🎪",
        cost: 150,
        stealthBonus: 0.25, // +25% к фактору скрытности
        desc: "Затеняет обзор наблюдателям: снижает генерацию палева на 25%."
      },
      {
        id: "stealth_2",
        name: "Фейковый сбой камер",
        icon: "📹",
        cost: 600,
        stealthBonus: 0.35,
        desc: "Имитация 'проблем с интернет-каналом' на 15 минут (+35% к скрытности)."
      },
      {
        id: "stealth_3",
        name: "Подкуп экзит-поллов",
        icon: "📊",
        cost: 2000,
        stealthBonus: 0.50,
        desc: "Социологи на выходе публикуют нужные цифры, сглаживая шум (+50% к скрытности)."
      },
      {
        id: "stealth_4",
        name: "Боты в комментариях",
        icon: "💬",
        cost: 6500,
        stealthBonus: 0.75,
        desc: "Тысячи аккаунтов топят любые видеозаписи вбросов во флуде (+75% к скрытности)."
      }
    ]
  }
};

/**
 * ШАГ 2: СОСТОЯНИЕ ИГРЫ (gameState)
 */
const INITIAL_GAME_STATE = {
  fakedVotes: 0,
  corruptionFunds: 0,
  wonElections: 0,
  conqueredCountries: [],
  currentCountry: null,
  currentParty: null,
  suspicion: 0,
  isScandalActive: false,
  scandalTimeRemaining: 0,
  purchasedUpgrades: [] // id купленных апгрейдов
};

let gameState = { ...INITIAL_GAME_STATE };

/**
 * РАСЧЕТ ИТОГОВЫХ МНОЖИТЕЛЕЙ
 */
function getPrestigeMultiplier() {
  // +50% за каждые выигранные выборы
  return 1 + (gameState.wonElections * 0.50);
}

function getPartyBuffs() {
  if (!gameState.currentCountry || !gameState.currentParty) {
    return { voteMultiplier: 1.0, stealthMultiplier: 1.0, kickbackMultiplier: 1.0 };
  }
  const country = CONFIG.countries[gameState.currentCountry];
  const party = country.parties.find(p => p.id === gameState.currentParty);
  return party ? party.buffs : { voteMultiplier: 1.0, stealthMultiplier: 1.0, kickbackMultiplier: 1.0 };
}

function getUpgraderMultiplier() {
  let mult = 1.0;
  CONFIG.upgrades.machinations.forEach(u => {
    if (u.type === "upgrader" && gameState.purchasedUpgrades.includes(u.id)) {
      mult *= u.effectValue;
    }
  });
  return mult;
}

function getFinalVoteMultiplier() {
  const party = getPartyBuffs();
  const prestige = getPrestigeMultiplier();
  const upgrader = getUpgraderMultiplier();
  return party.voteMultiplier * prestige * upgrader;
}

function getFinalStealthMultiplier() {
  const party = getPartyBuffs();
  const prestige = getPrestigeMultiplier();
  
  let gearBonus = 0;
  CONFIG.upgrades.conspiracy.forEach(item => {
    if (gameState.purchasedUpgrades.includes(item.id)) {
      gearBonus += item.stealthBonus;
    }
  });

  return (party.stealthMultiplier + gearBonus) * prestige;
}

function getFinalKickbackMultiplier() {
  const party = getPartyBuffs();
  const prestige = getPrestigeMultiplier();
  return party.kickbackMultiplier * prestige;
}

function getPassiveVotesPerSec() {
  let baseVotes = 0;
  CONFIG.upgrades.machinations.forEach(u => {
    if (u.type === "dropper" && gameState.purchasedUpgrades.includes(u.id)) {
      baseVotes += u.effectValue;
    }
  });
  return baseVotes * getFinalVoteMultiplier();
}

/**
 * ИГРОВОЙ ЦИКЛ (requestAnimationFrame)
 */
let lastTimestamp = performance.now();
let autoSaveTimer = 0;

function gameLoop(currentTimestamp) {
  const dt = (currentTimestamp - lastTimestamp) / 1000; // секунды
  lastTimestamp = currentTimestamp;

  updateSimulation(dt);
  renderUI();

  // Автосохранение каждые 3 секунды
  autoSaveTimer += dt;
  if (autoSaveTimer >= 3) {
    saveGame();
    autoSaveTimer = 0;
  }

  requestAnimationFrame(gameLoop);
}

function updateSimulation(dt) {
  if (!gameState.currentCountry || !gameState.currentParty) return;

  // Обработка активного скандала (заморозка)
  if (gameState.isScandalActive) {
    gameState.scandalTimeRemaining -= dt;
    if (gameState.scandalTimeRemaining <= 0) {
      gameState.isScandalActive = false;
      gameState.suspicion = 30; // Спадение палева после проверки
    }
    return; // Все начисления заблокированы во время аудита
  }

  // Пассивный доход от дропперов
  const passiveVotes = getPassiveVotesPerSec();
  if (passiveVotes > 0) {
    const gained = passiveVotes * dt;
    gameState.fakedVotes += gained;

    // Пассивный прирост палева с учетом скрытности
    const stealth = Math.max(0.2, getFinalStealthMultiplier());
    const suspicionDelta = (gained * 0.12) / stealth;
    gameState.suspicion = Math.min(100, gameState.suspicion + suspicionDelta);
  }

  // Естественное рассеивание палева со временем (0.8% в сек)
  if (gameState.suspicion > 0) {
    gameState.suspicion = Math.max(0, gameState.suspicion - (0.8 * dt));
  }

  // Проверка на 100% палева -> Старт Скандала
  if (gameState.suspicion >= 100) {
    triggerScandal();
  }
}

function triggerScandal() {
  gameState.isScandalActive = true;
  gameState.scandalTimeRemaining = 10; // 10 секунд заморозки
}

/**
 * РУЧНОЙ ВБРОС И КЛИКЕРНЫЕ ЭФФЕКТЫ
 */
function handleManualDrop(e) {
  if (gameState.isScandalActive) return;

  const basePower = 1;
  const power = Math.max(1, Math.round(basePower * getFinalVoteMultiplier()));
  
  gameState.fakedVotes += power;

  // Прирост палева от ручного клика
  const stealth = Math.max(0.2, getFinalStealthMultiplier());
  const addedSuspicion = (1.8 / stealth);
  gameState.suspicion = Math.min(100, gameState.suspicion + addedSuspicion);

  // Создание всплывающего числа (+X)
  createFloatingNumber(`+${power}`, e);

  if (gameState.suspicion >= 100) {
    triggerScandal();
  }
}

function createFloatingNumber(text, event) {
  const container = document.getElementById("floatingNumbersContainer");
  const el = document.createElement("div");
  el.className = "floating-number";
  el.textContent = text;

  // Точные координаты клика внутри кнопки
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX ? (event.clientX - rect.left) : (rect.width / 2);
  const y = event.clientY ? (event.clientY - rect.top) : (rect.height / 2);

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  container.appendChild(el);
  setTimeout(() => el.remove(), 850);
}

/**
 * ОТМЫВАНИЕ ГОЛОСОВ В КЭШ
 */
function handleLaunder() {
  const cost = 100;
  if (gameState.fakedVotes < cost || gameState.isScandalActive) return;

  const reward = Math.round(100 * getFinalKickbackMultiplier());
  gameState.fakedVotes -= cost;
  gameState.corruptionFunds += reward;
}

/**
 * ШАГ 4: ЛОГИКА МАГАЗИНА УЛУЧШЕНИЙ (ЦЕПОЧКИ ПОКУПОК)
 */
function renderUpgradesShop() {
  renderMachinationsTab();
  renderConspiracyTab();
}

function renderMachinationsTab() {
  const container = document.getElementById("machinationsList");
  container.innerHTML = "";

  const list = CONFIG.upgrades.machinations;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const isBought = gameState.purchasedUpgrades.includes(item.id);
    const prevBought = i === 0 || gameState.purchasedUpgrades.includes(list[i - 1].id);

    const card = document.createElement("div");
    card.className = `upgrade-card ${!prevBought ? "locked" : ""}`;

    if (!prevBought) {
      card.innerHTML = `
        <div class="upgrade-header">
          <span class="upgrade-icon">🔒</span>
          <div class="upgrade-title-box">
            <h4 class="upgrade-title">[ЗАСЕКРЕЧЕНО: УРОВЕНЬ ${i + 1}]</h4>
            <span class="upgrade-level">Требуется предыдущий шаг</span>
          </div>
        </div>
        <p class="upgrade-desc">Доступ к этому узлу заблокирован до модернизации предыдущего звена конвейера.</p>
      `;
    } else {
      const affordable = gameState.fakedVotes >= item.cost;
      card.innerHTML = `
        <div class="upgrade-header">
          <span class="upgrade-icon">${item.icon}</span>
          <div class="upgrade-title-box">
            <h4 class="upgrade-title">${item.name}</h4>
            <span class="upgrade-level">${item.type === "dropper" ? "Дроппер" : "Умножающие ворота"}</span>
          </div>
        </div>
        <p class="upgrade-desc">${item.desc}</p>
        <div class="upgrade-footer">
          <span class="upgrade-price">🗳️ ${item.cost.toLocaleString("ru-RU")}</span>
          <button class="btn-buy ${isBought ? "maxed" : (affordable ? "affordable" : "unaffordable")}" 
                  ${isBought || !affordable ? "disabled" : ""} 
                  data-upgrade-id="${item.id}">
            ${isBought ? "Куплено ✓" : "Установить"}
          </button>
        </div>
      `;

      if (!isBought && affordable) {
        card.querySelector(".btn-buy").addEventListener("click", () => buyUpgrade(item.id, "fakedVotes", item.cost));
      }
    }

    container.appendChild(card);
  }
}

function renderConspiracyTab() {
  const container = document.getElementById("conspiracyList");
  container.innerHTML = "";

  const list = CONFIG.upgrades.conspiracy;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const isBought = gameState.purchasedUpgrades.includes(item.id);
    const prevBought = i === 0 || gameState.purchasedUpgrades.includes(list[i - 1].id);

    const card = document.createElement("div");
    card.className = `upgrade-card ${!prevBought ? "locked" : ""}`;

    if (!prevBought) {
      card.innerHTML = `
        <div class="upgrade-header">
          <span class="upgrade-icon">🕶️</span>
          <div class="upgrade-title-box">
            <h4 class="upgrade-title">[ЗАСЕКРЕЧЕННЫЙ ПРОТОКОЛ]</h4>
            <span class="upgrade-level">Гриф секретности</span>
          </div>
        </div>
        <p class="upgrade-desc">Купите предыдущее стелс-оборудование для расширения сети прикрытия.</p>
      `;
    } else {
      const affordable = gameState.corruptionFunds >= item.cost;
      card.innerHTML = `
        <div class="upgrade-header">
          <span class="upgrade-icon">${item.icon}</span>
          <div class="upgrade-title-box">
            <h4 class="upgrade-title">${item.name}</h4>
            <span class="upgrade-level">Стелс-оборудование</span>
          </div>
        </div>
        <p class="upgrade-desc">${item.desc}</p>
        <div class="upgrade-footer">
          <span class="upgrade-price" style="color: var(--cash-color);">💵 $${item.cost.toLocaleString("ru-RU")}</span>
          <button class="btn-buy ${isBought ? "maxed" : (affordable ? "affordable" : "unaffordable")}" 
                  ${isBought || !affordable ? "disabled" : ""} 
                  data-upgrade-id="${item.id}">
            ${isBought ? "Установлено ✓" : "Подкупить"}
          </button>
        </div>
      `;

      if (!isBought && affordable) {
        card.querySelector(".btn-buy").addEventListener("click", () => buyUpgrade(item.id, "corruptionFunds", item.cost));
      }
    }

    container.appendChild(card);
  }
}

function buyUpgrade(id, currencyField, cost) {
  if (gameState[currencyField] < cost) return;
  gameState[currencyField] -= cost;
  gameState.purchasedUpgrades.push(id);
  saveGame();
  renderUpgradesShop();
}

/**
 * ОТРИСОВКА ИНТЕРФЕЙСА (UI RENDER)
 */
function renderUI() {
  if (!gameState.currentCountry) return;

  // Валюты и счетчики
  document.getElementById("fakedVotesDisplay").textContent = Math.floor(gameState.fakedVotes).toLocaleString("ru-RU");
  document.getElementById("corruptionFundsDisplay").textContent = `$${Math.floor(gameState.corruptionFunds).toLocaleString("ru-RU")}`;
  document.getElementById("wonElectionsDisplay").textContent = gameState.wonElections;

  // Метрики
  const clickPower = Math.max(1, Math.round(1 * getFinalVoteMultiplier()));
  document.getElementById("clickPowerDisplay").textContent = clickPower;
  document.getElementById("passiveIncomeDisplay").textContent = `+${getPassiveVotesPerSec().toFixed(1)} / сек`;
  document.getElementById("stealthMultiplierDisplay").textContent = `x${getFinalStealthMultiplier().toFixed(2)}`;
  document.getElementById("prestigeMultiplierDisplay").textContent = `+${Math.round((getPrestigeMultiplier() - 1) * 100)}%`;

  // Шкала Палева
  const bar = document.getElementById("suspicionBar");
  const percentText = document.getElementById("suspicionValue");
  bar.style.width = `${gameState.suspicion}%`;
  percentText.textContent = `${Math.round(gameState.suspicion)}%`;

  if (gameState.suspicion < 45) {
    bar.style.backgroundColor = "var(--success-color)";
  } else if (gameState.suspicion < 80) {
    bar.style.backgroundColor = "var(--warning-color)";
  } else {
    bar.style.backgroundColor = "var(--danger-color)";
  }

  // Скандал-баннер
  const scandalBanner = document.getElementById("scandalBanner");
  const dropBtn = document.getElementById("btnManualDrop");
  if (gameState.isScandalActive) {
    scandalBanner.classList.remove("hidden");
    document.getElementById("scandalTimer").textContent = `${Math.ceil(gameState.scandalTimeRemaining)} сек`;
    dropBtn.disabled = true;
  } else {
    scandalBanner.classList.add("hidden");
    dropBtn.disabled = false;
  }

  // Кнопка отмывания
  const launderBtn = document.getElementById("btnLaunderVotes");
  const launderReward = Math.round(100 * getFinalKickbackMultiplier());
  document.getElementById("launderRewardDisplay").textContent = `+$${launderReward}`;
  launderBtn.disabled = gameState.fakedVotes < 100 || gameState.isScandalActive;

  // Обновление состояния кнопок в магазине
  updateShopButtonsState();
}

function updateShopButtonsState() {
  document.querySelectorAll(".shop-list .btn-buy:not(.maxed)").forEach(btn => {
    const id = btn.dataset.upgradeId;
    if (!id) return;

    let item = CONFIG.upgrades.machinations.find(x => x.id === id);
    let currency = "fakedVotes";
    if (!item) {
      item = CONFIG.upgrades.conspiracy.find(x => x.id === id);
      currency = "corruptionFunds";
    }

    if (item) {
      const affordable = gameState[currency] >= item.cost;
      btn.className = `btn-buy ${affordable ? "affordable" : "unaffordable"}`;
      btn.disabled = !affordable;
    }
  });
}

/**
 * АВТОСОХРАНЕНИЕ И СБРОС (localStorage)
 */
const STORAGE_KEY = "election_sim_save_v2";

function saveGame() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.warn("Ошибка сохранения:", e);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      gameState = { ...INITIAL_GAME_STATE, ...parsed };
      return true;
    }
  } catch (e) {
    console.error("Ошибка загрузки:", e);
  }
  return false;
}

function hardResetSave() {
  if (confirm("Вы точно хотите сбросить весь прогресс, победы и улучшения?")) {
    localStorage.removeItem(STORAGE_KEY);
    gameState = { ...INITIAL_GAME_STATE };
    location.reload();
  }
}

/**
 * ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ
 */
document.addEventListener("DOMContentLoaded", () => {
  const hasSave = loadGame();

  renderCountrySelection();
  setupEventListeners();

  if (hasSave && gameState.currentCountry && gameState.currentParty) {
    startCampaign(false); // Запуск без перетирания сохраненных данных
  }

  requestAnimationFrame(gameLoop);
});

function setupEventListeners() {
  // Кнопка кликера
  document.getElementById("btnManualDrop").addEventListener("click", handleManualDrop);

  // Кнопка отмыва
  document.getElementById("btnLaunderVotes").addEventListener("click", handleLaunder);

  // Табы магазина прокачки
  const tabMach = document.getElementById("tabMachinations");
  const tabConsp = document.getElementById("tabConspiracy");
  const listMach = document.getElementById("machinationsList");
  const listConsp = document.getElementById("conspiracyList");

  tabMach.addEventListener("click", () => {
    tabMach.classList.add("active");
    tabConsp.classList.remove("active");
    listMach.classList.remove("hidden");
    listConsp.classList.add("hidden");
    renderMachinationsTab();
  });

  tabConsp.addEventListener("click", () => {
    tabConsp.classList.add("active");
    tabMach.classList.remove("active");
    listConsp.classList.remove("hidden");
    listMach.classList.add("hidden");
    renderConspiracyTab();
  });

  // Кнопка полного сброса
  document.getElementById("btnHardReset").addEventListener("click", hardResetSave);

  // Модалка и кампании
  document.getElementById("btnBackToCountries").addEventListener("click", () => {
    document.getElementById("stepParty").classList.add("hidden");
    document.querySelectorAll(".country-card").forEach(c => c.classList.remove("selected"));
    document.getElementById("btnStartGame").disabled = true;
  });

  document.getElementById("btnStartGame").addEventListener("click", () => {
    startCampaign(true);
  });

  document.getElementById("btnSwitchCampaign").addEventListener("click", () => {
    document.getElementById("campaignModal").classList.remove("hidden");
  });
}

function renderCountrySelection() {
  const container = document.getElementById("countryGrid");
  container.innerHTML = "";

  Object.keys(CONFIG.countries).forEach(key => {
    const c = CONFIG.countries[key];
    const card = document.createElement("div");
    card.className = "country-card";
    card.dataset.country = key;

    card.innerHTML = `
      <div class="country-card-header">
        <span class="flag-icon">${c.flag}</span>
        <h4>${c.name}</h4>
      </div>
      <span class="system-badge-text" style="color: #60a5fa; font-size: 0.75rem; font-weight: 700; display: block; margin: 4px 0;">${c.systemName}</span>
      <p style="font-size: 0.78rem; color: #94a3b8; line-height: 1.35;">${c.description}</p>
    `;

    card.addEventListener("click", () => selectCountry(key));
    container.appendChild(card);
  });
}

function selectCountry(countryKey) {
  document.querySelectorAll(".country-card").forEach(card => {
    card.classList.toggle("selected", card.dataset.country === countryKey);
  });

  renderPartySelection(countryKey);
  document.getElementById("stepParty").classList.remove("hidden");
  document.getElementById("btnStartGame").disabled = true;
}

function renderPartySelection(countryKey) {
  const container = document.getElementById("partyGrid");
  container.innerHTML = "";

  const parties = CONFIG.countries[countryKey].parties;
  parties.forEach(p => {
    const card = document.createElement("div");
    card.className = "party-card";
    card.dataset.party = p.id;
    card.style.borderTop = `4px solid ${p.color}`;

    card.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 1.5rem;">${p.icon}</span>
        <h4 style="font-size: 0.95rem;">${p.name}</h4>
      </div>
      <p style="font-size: 0.76rem; color: #94a3b8; margin-bottom: 10px;">${p.desc}</p>
      <div style="font-size: 0.72rem; font-family: monospace; display: flex; flex-direction: column; gap: 4px;">
        <div>Голоса: <strong>x${p.buffs.voteMultiplier.toFixed(2)}</strong></div>
        <div>Скрытность: <strong>x${p.buffs.stealthMultiplier.toFixed(2)}</strong></div>
        <div>Откаты: <strong>x${p.buffs.kickbackMultiplier.toFixed(2)}</strong></div>
      </div>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".party-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      gameState.pendingCountry = countryKey;
      gameState.pendingParty = p.id;
      document.getElementById("btnStartGame").disabled = false;
    });

    container.appendChild(card);
  });
}

function startCampaign(isNewSelection = true) {
  if (isNewSelection && gameState.pendingCountry && gameState.pendingParty) {
    gameState.currentCountry = gameState.pendingCountry;
    gameState.currentParty = gameState.pendingParty;
  }

  const country = CONFIG.countries[gameState.currentCountry];
  const party = country.parties.find(p => p.id === gameState.currentParty);

  // Темизация CSS
  document.documentElement.style.setProperty("--theme-color", party.color);
  document.documentElement.style.setProperty("--theme-glow", party.color + "44");

  // Заполнение шапки
  document.getElementById("countryFlag").textContent = country.flag;
  document.getElementById("countryName").textContent = country.name;
  document.getElementById("systemName").textContent = country.systemName;
  document.getElementById("partyIcon").textContent = party.icon;
  document.getElementById("partyName").textContent = party.name;
  document.getElementById("partyBuffs").textContent = 
    `x${party.buffs.voteMultiplier} бюлл. | x${party.buffs.stealthMultiplier} стелс`;

  document.getElementById("systemBriefing").innerHTML = `
    <strong>Цель кампании (${country.systemName}):</strong> ${country.victoryCondition}
  `;

  // Переключение экранов
  document.getElementById("campaignModal").classList.add("hidden");
  document.getElementById("gameHeader").classList.remove("hidden");
  document.getElementById("gameWorkspace").classList.remove("hidden");

  // Инициализация магазина
  renderUpgradesShop();
  saveGame();
}