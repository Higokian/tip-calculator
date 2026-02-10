const getElement = (id) => document.getElementById(id); // Helper function to get DOM elements by ID

// Get references to DOM elements
const elements = {
  billAmount: getElement("billAmount"),
  tipPercentage: getElement("tipPercentage"),
  numPeople: getElement("numPeople"),
  calculateBtn: getElement("calculateBtn"),
  resultsDiv: getElement("results"),
  tipAmountSpan: getElement("tipAmount"),
  totalBillSpan: getElement("totalBill"),
  perPersonSpan: getElement("perPerson"),
  resetBtn: getElement("resetBtn"),
};

// Destructure elements for easier access
const {
  billAmount,
  tipPercentage,
  numPeople,
  calculateBtn,
  resultsDiv,
  tipAmountSpan,
  totalBillSpan,
  perPersonSpan,
  resetBtn,
} = elements;

// Calculator object with methods for each calculation step
const calculator = {
  calculateTip: (bill, tipPercent) => (bill * tipPercent) / 100,
  calculateTotal: (bill, tip) => bill + tip,
  calculatePerPerson: (total, people) => total / people,

  // Method to perform all calculations at once using spread operator
  // ...value
  calculateAll: (...values) => {
    const [bill, tipPercent, people] = values;
    const tip = calculator.calculateTip(bill, tipPercent);
    const total = calculator.calculateTotal(bill, tip);
    const perPerson = calculator.calculatePerPerson(total, people);
    return [tip, total, perPerson];
  },
};

const calculate = () => {
  // Get input values using destructuring
  const values = {
    bill: Number.parseFloat(billAmount.value),
    tipPercent: Number.parseFloat(tipPercentage.value),
    people: Number.parseFloat(numPeople.value),
  };
  const { bill, tipPercent, people } = values;

  // Input validation
  if (
    Number.isNaN(bill) ||
    Number.isNaN(tipPercent) ||
    Number.isNaN(people) ||
    bill <= 0 ||
    tipPercent < 0 ||
    people <= 0
  ) {
    alert("Please enter valid positive numbers");
  }

  // Perform calculations using spread operator
  const results = calculator.calculateAll(...Object.values(values));
  const [tip, total, perPerson] = results;
  console.log(results);

  // Display results
  tipAmountSpan.textContent = `$${tip.toFixed(2)}`;
  totalBillSpan.textContent = `$${total.toFixed(2)}`;
  perPersonSpan.textContent = `$${perPerson.toFixed(2)}`;

  resultsDiv.classList.remove("hidden");
};

// TODO: Add event listener to calculate button
calculateBtn.addEventListener("click", calculate);

// BONUS: Add real-time calculation on input change

// Add input event listeners to all inputs
const inputs = [billAmount, tipPercentage, numPeople];

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    // Only calculate if bill amount is entered
    if (billAmount.value && billAmount.value > 0) {
      calculate();
    }
  });
});

// BONUS: Add reset button
const reset = () => {
  billAmount.value = "";
  tipPercentage.value = "15";
  numPeople.value = "1";

  // Hide results
  resultsDiv.classList.add("hidden");

  // Remove active class from tip buttons
  tipButtons.forEach((btn) => btn.classList.remove("active"));
};

resetBtn.addEventListener("click", reset);

// BONUS: Add custom tip quick-select buttons (10%, 15%, 20%, 25%)

const tipButtons = document.querySelectorAll(".tip-btn");
tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Destructure the dataset from the clicked button
    const {
      dataset: { tip },
    } = event.target;

    // Update input
    tipPercentage.value = tip;
    console.log(`Selected tip: ${tip}%`);

    // Remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    event.target.classList.add("active");

    // Trigger calculation
    calculate();
  });
});
