const inputRange = document.getElementById("range");
const activeColor = "hsl(127, 100%, 82%)";
const inactiveColor = "hsl(248, 15%, 11%)";

const inputEl = document.getElementById("input-text");
const copyEl = document.querySelector(".copy-icon");
const CharacterValueEl = document.querySelector(".Character-value");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.querySelector(".button");
const statusNameEl = document.querySelector(".status-name");
const statusBars = document.querySelectorAll(".bar");

inputRange.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
  CharacterValueEl.innerHTML = this.value;
});

class PasswordGenerator {
  constructor() {
    this.uppercaseEl = uppercaseEl;
    this.lowercaseEl = lowercaseEl;
    this.numbersEl = numbersEl;
    this.symbolsEl = symbolsEl;
    this.inputEl = inputEl;
    this.CharacterValueEl = CharacterValueEl;

    this.uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    this.numbersChars = "0123456789";
    this.symbolsChars = "!@#$%^&*()";
  }

  generatePassword = (
    length = parseInt(this.CharacterValueEl.innerHTML, 10)
  ) => {
    let characters = "";
    let password = "";

    characters += this.uppercaseEl.checked ? this.uppercaseChars : "";
    characters += this.lowercaseEl.checked ? this.lowercaseChars : "";
    characters += this.symbolsEl.checked ? this.symbolsChars : "";
    characters += this.numbersEl.checked ? this.numbersChars : "";

    for (let i = 0; i < length; i++) {
      let randomPass = Math.floor(Math.random() * characters.length);
      password += characters.substring(randomPass, randomPass + 1);
    }
    this.inputEl.value = password;
    return password;
  };
}

const passwordGenerator = new PasswordGenerator();

generateBtn.addEventListener("click", () => {
  passwordGenerator.generatePassword();
  updateStrengthStatus();
});

const updateStrengthStatus = () => {
  const checkedCount = [uppercaseEl, lowercaseEl, numbersEl, symbolsEl].filter(
    (element) => element.checked
  ).length;

  let statusName;
  let activeBars;
  let barColor;

  switch (checkedCount) {
    case 1:
      statusName = "TOO WEAK!";
      activeBars = 1;
      barColor = "#F64A4A";
      break;
    case 2:
      statusName = "WEAK";
      activeBars = 2;
      barColor = "#FB7C58";
      break;
    case 3:
      statusName = "MEDIUM";
      activeBars = 3;
      barColor = "#F8CD65";
      break;
    case 4:
      statusName = "STRONG";
      activeBars = 4;
      barColor = "#A4FFAF";
      break;
    default:
      statusName = "";
  }

  statusNameEl.textContent = statusName;

  statusBars.forEach((bar, index) => {
    if (index < activeBars) {
      bar.style.backgroundColor = barColor;
      bar.style.border = "none";
    } else {
      bar.style.backgroundColor = inactiveColor;
      bar.style.border = "2px solid white";
    }
  });
};

[uppercaseEl, lowercaseEl, numbersEl, symbolsEl].forEach((element) => {
  element.addEventListener("change", updateStrengthStatus);
});

const copyToClipboard = () => {
  const copy = navigator.clipboard;
  if (inputEl.value.length > 0) {
    copy
      .writeText(inputEl.value)
      .then(() => alert("Password copied to clipboard"));
  } else {
    alert("No password to copy");
  }
};
copyEl.addEventListener("click", copyToClipboard);
