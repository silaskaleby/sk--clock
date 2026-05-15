const body = document.body;
const homeScreen = document.querySelector("#home-screen");
const clockScreen = document.querySelector("#clock-screen");
const modeTitle = document.querySelector("#mode-title");
const hourHand = document.querySelector("#hour-hand");
const minuteHand = document.querySelector("#minute-hand");
const secondHand = document.querySelector("#second-hand");
const digitalTime = document.querySelector("#digital-time");
const periodLabel = document.querySelector("#period-label");
const heroTime = document.querySelector("#hero-time");
const currentDate = document.querySelector("#current-date");
const simpleWay = document.querySelector("#simple-way");
const naturalWay = document.querySelector("#natural-way");
const meaningWay = document.querySelector("#meaning-way");
const lessonNote = document.querySelector("#lesson-note");
const navButtons = document.querySelectorAll("[data-mode]");
const startButtons = document.querySelectorAll("[data-start-mode]");
const homeButtons = document.querySelectorAll("[data-action='home']");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const requiredElements = [
  body,
  homeScreen,
  clockScreen,
  modeTitle,
  hourHand,
  minuteHand,
  secondHand,
  digitalTime,
  periodLabel,
  heroTime,
  currentDate,
  simpleWay,
  naturalWay,
  meaningWay,
  lessonNote,
  themeToggle,
  themeIcon,
];

const canStartApp = requiredElements.every(Boolean);

const hourWords = [
  "twelve",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
];

const minuteWords = [
  "o'clock",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty-one",
  "twenty-two",
  "twenty-three",
  "twenty-four",
  "twenty-five",
  "twenty-six",
  "twenty-seven",
  "twenty-eight",
  "twenty-nine",
  "thirty",
  "thirty-one",
  "thirty-two",
  "thirty-three",
  "thirty-four",
  "thirty-five",
  "thirty-six",
  "thirty-seven",
  "thirty-eight",
  "thirty-nine",
  "forty",
  "forty-one",
  "forty-two",
  "forty-three",
  "forty-four",
  "forty-five",
  "forty-six",
  "forty-seven",
  "forty-eight",
  "forty-nine",
  "fifty",
  "fifty-one",
  "fifty-two",
  "fifty-three",
  "fifty-four",
  "fifty-five",
  "fifty-six",
  "fifty-seven",
  "fifty-eight",
  "fifty-nine",
];

const hourPt = [
  "meia-noite",
  "uma",
  "duas",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
  "dez",
  "onze",
];

const exactHourPt = {
  0: "meia-noite",
  12: "meio-dia",
};

const minutePt = [
  "",
  "um minuto",
  "dois minutos",
  "três minutos",
  "quatro minutos",
  "cinco minutos",
  "seis minutos",
  "sete minutos",
  "oito minutos",
  "nove minutos",
  "dez minutos",
  "onze minutos",
  "doze minutos",
  "treze minutos",
  "quatorze minutos",
  "quinze minutos",
  "dezesseis minutos",
  "dezessete minutos",
  "dezoito minutos",
  "dezenove minutos",
  "vinte minutos",
  "vinte e um minutos",
  "vinte e dois minutos",
  "vinte e três minutos",
  "vinte e quatro minutos",
  "vinte e cinco minutos",
  "vinte e seis minutos",
  "vinte e sete minutos",
  "vinte e oito minutos",
  "vinte e nove minutos",
  "trinta minutos",
];

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function getHourWord(hour) {
  return hourWords[hour % 12];
}

function getPtHour(hour) {
  return hourPt[hour % 12];
}

function getPtExactHour(hour) {
  const normalized = ((hour % 24) + 24) % 24;
  return exactHourPt[normalized] || getPtHour(normalized);
}

function afterHourText(hour) {
  const normalized = ((hour % 24) + 24) % 24;
  const name = getPtExactHour(normalized);

  if (normalized === 0) {
    return "da meia-noite";
  }

  if (normalized === 1 || normalized === 13) {
    return "da uma";
  }

  if (normalized === 12) {
    return "do meio-dia";
  }

  return `das ${name}`;
}

function toHourText(hour) {
  const normalized = ((hour % 24) + 24) % 24;

  if (normalized === 0) {
    return "meia-noite";
  }

  if (normalized === 12) {
    return "meio-dia";
  }

  return getPtHour(normalized);
}

function buildAnalogFace() {
  const analogClock = document.querySelector("#analog-clock");
  if (!analogClock) {
    return;
  }

  analogClock.querySelectorAll(".clock-marker, .hour-number").forEach((item) => item.remove());

  const markerRadius = 46;
  const numberRadius = 39;

  for (let minute = 0; minute < 60; minute += 1) {
    const angle = (minute / 60) * 360;
    const marker = document.createElement("span");
    marker.className = `clock-marker${minute % 5 === 0 ? " is-hour" : ""}`;
    marker.style.left = `${50 + Math.sin((angle * Math.PI) / 180) * markerRadius}%`;
    marker.style.top = `${50 - Math.cos((angle * Math.PI) / 180) * markerRadius}%`;
    marker.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    analogClock.prepend(marker);
  }

  for (let hour = 1; hour <= 12; hour += 1) {
    const angle = (hour / 12) * 360;
    const number = document.createElement("span");
    number.className = "hour-number";
    number.textContent = hour;
    number.style.left = `${50 + Math.sin((angle * Math.PI) / 180) * numberRadius}%`;
    number.style.top = `${50 - Math.cos((angle * Math.PI) / 180) * numberRadius}%`;
    analogClock.prepend(number);
  }
}

function setMode(mode) {
  body.dataset.clockMode = mode;
  modeTitle.textContent = mode === "analog" ? "Relógio Analógico" : "Relógio Digital";

  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });
}

function showClock(mode) {
  setMode(mode);
  homeScreen.classList.remove("is-visible");
  clockScreen.classList.add("is-visible");
}

function showHome() {
  clockScreen.classList.remove("is-visible");
  homeScreen.classList.add("is-visible");
}

function getSimpleWay(hours, minutes) {
  const hour = getHourWord(hours);

  if (minutes === 0) {
    return `${hour} o'clock`;
  }

  if (minutes < 10) {
    return `${hour} oh ${minuteWords[minutes]}`;
  }

  return `${hour} ${minuteWords[minutes]}`;
}

function getNaturalMinutePhrase(minutes) {
  const isSingle = minutes === 1;

  if (minutes % 5 === 0) {
    return minuteWords[minutes];
  }

  return `${minuteWords[minutes]} ${isSingle ? "minute" : "minutes"}`;
}

function getNaturalWay(hours, minutes) {
  const currentHour = getHourWord(hours);
  const nextHour = getHourWord(hours + 1);

  if (minutes === 0) {
    return `${currentHour} o'clock`;
  }

  if (minutes === 15) {
    return `a quarter past ${currentHour}`;
  }

  if (minutes === 30) {
    return `half past ${currentHour}`;
  }

  if (minutes === 45) {
    return `a quarter to ${nextHour}`;
  }

  if (minutes < 30) {
    return `${getNaturalMinutePhrase(minutes)} past ${currentHour}`;
  }

  return `${getNaturalMinutePhrase(60 - minutes)} to ${nextHour}`;
}

function getMeaning(hours, minutes) {
  const currentHour = afterHourText(hours);
  const nextHour = toHourText(hours + 1);

  if (minutes === 0) {
    return `Hora exata: ${getPtExactHour(hours)}`;
  }

  if (minutes === 15) {
    return `Quinze minutos depois ${currentHour}`;
  }

  if (minutes === 30) {
    return `Meia hora depois ${currentHour}`;
  }

  if (minutes === 45) {
    return `Um quarto para ${nextHour}`;
  }

  if (minutes < 30) {
    return `${minutePt[minutes]} depois ${currentHour}`;
  }

  const remainingMinutes = 60 - minutes;
  const verb = remainingMinutes === 1 ? "Falta" : "Faltam";
  return `${verb} ${minutePt[remainingMinutes]} para ${nextHour}`;
}

function getLessonNote(hours, minutes) {
  const currentHour = getHourWord(hours);
  const nextHour = getHourWord(hours + 1);

  if (minutes === 0) {
    return `Use o'clock quando a hora está exata: ${currentHour} o'clock.`;
  }

  if (minutes === 15) {
    return `Quarter significa 15 minutos: a quarter past ${currentHour}.`;
  }

  if (minutes === 30) {
    return `Half past indica 30 minutos depois da hora: half past ${currentHour}.`;
  }

  if (minutes === 45) {
    return `A quarter to indica 15 minutos para a próxima hora: ${nextHour}.`;
  }

  if (minutes < 30) {
    return `Use past para minutos depois da hora: ${getNaturalMinutePhrase(minutes)} past ${currentHour}.`;
  }

  return `Use to para minutos que faltam até a próxima hora: ${getNaturalMinutePhrase(60 - minutes)} to ${nextHour}.`;
}

function updateLearning(hours, minutes) {
  simpleWay.textContent = capitalize(getSimpleWay(hours, minutes));
  naturalWay.textContent = capitalize(getNaturalWay(hours, minutes));
  meaningWay.textContent = getMeaning(hours, minutes);
  lessonNote.textContent = getLessonNote(hours, minutes);
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const smoothSeconds = seconds + milliseconds / 1000;
  const smoothMinutes = minutes + smoothSeconds / 60;
  const smoothHours = (hours % 12) + smoothMinutes / 60;

  hourHand.style.transform = `translateX(-50%) rotate(${smoothHours * 30}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${smoothMinutes * 6}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${smoothSeconds * 6}deg)`;

  digitalTime.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  heroTime.textContent = `${pad(hours)}:${pad(minutes)}`;
  periodLabel.textContent = hours < 12 ? "AM" : "PM";
  currentDate.textContent = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(now);

  updateLearning(hours, minutes);
  requestAnimationFrame(updateClock);
}

function applyTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light", isLight);
  themeIcon.textContent = isLight ? "◑" : "◐";

  try {
    localStorage.setItem("sk-clock-theme", theme);
  } catch (error) {
    console.warn("SK Clock: não foi possível salvar o tema no navegador.");
  }
}

function initTheme() {
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("sk-clock-theme") || "dark";
  } catch (error) {
    savedTheme = "dark";
  }

  applyTheme(savedTheme);
}

if (canStartApp) {
  startButtons.forEach((button) => {
    button.addEventListener("click", () => showClock(button.dataset.startMode));
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", () => showClock(button.dataset.mode));
  });

  homeButtons.forEach((button) => {
    button.addEventListener("click", showHome);
  });

  themeToggle.addEventListener("click", () => {
    applyTheme(body.classList.contains("light") ? "dark" : "light");
  });

  setMode("analog");
  initTheme();
  buildAnalogFace();
  updateClock();
} else {
  console.error("SK Clock: algum elemento essencial do HTML não foi encontrado.");
}
