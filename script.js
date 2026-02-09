// TODO: Select all necessary DOM elements using destructuring
// Hint: Get billAmount, tipPercentage, numPeople, calculateBtn, results div, and result spans

const getElement = (id) => document.getElementById(id);
const elements = {
  billAmount: getElement("billAmount"),
  tipPercentage: getElement("tipPercentage"),
  numPeople: getElement("numPeople"),
  calculateBtn: getElement("calculateBtn"),
  resultsDiv: getElement("results"),
  tipAmountSpan: getElement("tipAmount"),
  totalBillSpan: getElement("totalBill"),
  perPersonSpan: getElement("perPerson"),
};

const {
  billAmount,
  tipPercentage,
  numPeople,
  calculateBtn,
  resultsDiv,
  tipAmountSpan,
  totalBillSpan,
  perPersonSpan,
} = elements;

// TODO: Create a config object with calculation functions
// Include: calculateTip, calculateTotal, calculatePerPerson
// Use arrow functions and spread/rest where appropriate

const calculator = {
  calculateTip: (bill, tipPercent) => (bill * tipPercent) / 100,
  calculateTotal: (bill, tip) => bill + tip,
  calculatePerPerson: (total, people) => total / people,

  calculateAll: (...values) => {
    const [bill, tipPercent, people] = values;
    const tip = calculator.calculateTip(bill, tipPercent);
    const total = calculator.calculateTotal(bill, tip);
    const perPerson = calculator.calculatePerPerson(total, people);
    return [ tip, total, perPerson ];
  },
};

// TODO: Create a calculate function that:
// 1. Gets input values (use destructuring!)
// 2. Validates inputs
// 3. Performs calculations using spread operator for function arguments
// 4. Displays results
const calculate = () => {
  const values = {
    bill: Number.parseFloat(billAmount.value),
    tipPercent: Number.parseFloat(tipPercentage.value),
    people: Number.parseFloat(numPeople.value),
  };

  const { bill, tipPercent, people } = values;

  if (Number.isNaN(bill) ||Number.isNaN(tipPercent) || Number.isNaN(people) || bill <= 0 || tipPercent < 0 || people <= 0) {
    alert("Please enter valid positive numbers");
  }

  const results = calculator.calculateAll(...Object.values(values));
  const [ tip, total, perPerson ] = results;
  console.log(results);

  tipAmountSpan.textContent = tip.toFixed(2);
  totalBillSpan.textContent = total.toFixed(2);
  perPersonSpan.textContent = perPerson.toFixed(2);
};

// TODO: Add event listener to calculate button
calculateBtn.addEventListener("click", calculate);

// BONUS: Add real-time calculation on input change
// BONUS: Add reset button
// BONUS: Add custom tip quick-select buttons (10%, 15%, 20%, 25%)
