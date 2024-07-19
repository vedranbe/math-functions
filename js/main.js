// List of functions with titles and corresponding values
const functionNames = [
    { title: "Factorial", value: "factorial" },
    { title: "Square Root", value: "squareRoot" },
    { title: "Cube Root", value: "cubeRoot" },
    { title: "Fourth Root", value: "fourthRoot" },
    { title: "Square", value: "square" },
    { title: "Cube", value: "cube" },
    { title: "Power of 2", value: "power" },
    { title: "Circle Area", value: "circleArea" },
    { title: "Sine", value: "sine" },
    { title: "Cosine", value: "cos" },
    { title: "Logarithm", value: "log" },
];

// Function to add commas to numbers for better readability
function numberWithCommas(x) {
    const [integerPart, decimalPart] = x.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInteger}${decimalPart ? "." + decimalPart : ""}`;
}

// Function to update odd/even classes on visible table rows
function updateOddEvenClasses() {
    const visibleRows = document.querySelectorAll('table .visible');
    visibleRows.forEach((row, index) => {
        row.classList.remove('odd', 'even');
        row.classList.add(index % 2 === 0 ? 'odd' : 'even');
    });
}

// Function to create checkboxes for each function in the list
function createCheckbox(functionInfo) {
    const checkboxContainer = document.getElementById("checkbox-container");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const spanTitle = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.id = functionInfo.value + "Checkbox";
    checkbox.checked = true;

    label.appendChild(checkbox);

    const titleText = document.createTextNode(functionInfo.title);
    spanTitle.classList.add("title");
    spanTitle.appendChild(titleText);
    label.appendChild(spanTitle);

    checkbox.addEventListener("change", function () {
        const tableBody = document.querySelector("table tbody");
        const matchingRows = Array.from(tableBody.querySelectorAll("tr"))
            .filter(row => row.querySelector(`td.copy-cell #${functionInfo.value}`));

        matchingRows.forEach(row => row.classList.toggle("visible", this.checked));
        updateOddEvenClasses();
    });

    checkboxContainer.appendChild(label);
}

// Function to remove "fa-solid" class from icons and handle clipboard interaction
function handleClipboardClick() {
    const copyCells = document.querySelectorAll(".copy-cell");

    copyCells.forEach(cell => {
        const icon = cell.querySelector("span.fa-clipboard");

        if (icon && icon.classList.contains("fa-solid")) {
            icon.classList.remove("fa-solid");
        }

        cell.addEventListener("click", function () {
            removeClass();
            icon.classList.add("fa-solid");

            const span = this.querySelector("span");

            if (!navigator.clipboard) {
                return;
            }

            const notificationDiv = document.createElement("div");
            notificationDiv.classList.add("clipboard-notification");
            notificationDiv.textContent = navigator.clipboard.writeText(span.textContent)
                .then(() => notificationDiv.textContent = "Copied to clipboard!")
                .catch(err => notificationDiv.textContent = "Failed to copy: " + err);

            document.body.appendChild(notificationDiv);
            notificationDiv.style.opacity = 1;

            setTimeout(() => {
                notificationDiv.style.opacity = 0;
                setTimeout(() => {
                    notificationDiv.remove();
                }, 600);
            }, 600);
        });
    });
}

// Function to handle input changes and update corresponding calculations and outputs
function handleNumberInputChange() {
    const numberInput = document.getElementById("numberInput");
    const number = parseFloat(numberInput.value);
    const isEmpty = numberInput.value.trim() === "";
    const table = document.querySelector("table");

    table.style.display = isEmpty ? "none" : "block";

    if (isNaN(number) || number <= 1) {
        primeMessage.innerHTML = `<span class="not-prime">Not a prime number</span>`;
        return;
    }

    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }

    primeMessage.innerHTML = isPrime ? `<span class="prime">Prime number</span>` : `<span class="not-prime">Not a prime number</span>`;

    // Update displayed results for each function
    document.querySelectorAll(".numberOutput").forEach(element => element.textContent = numberWithCommas(number));
    document.getElementById("factorial").textContent = `${factorial(number)}`;
    document.getElementById("squareRoot").textContent = `${squareRoot(number)}`;
    document.getElementById("cubeRoot").textContent = `${Math.pow(number, 1 / 3)}`;
    document.getElementById("fourthRoot").textContent = `${Math.pow(number, 1 / 4)}`;
    document.getElementById("square").textContent = `${numberWithCommas(square(number))}`;
    document.getElementById("cube").textContent = `${numberWithCommas(cube(number))}`;
    document.getElementById("power").textContent = `${numberWithCommas(Math.pow(2, number))}`;
    document.getElementById("circleArea").textContent = `${numberWithCommas(circleArea(number))}`;
    const sineCosineResult = calculateSineCosine(number);
    document.getElementById("sine").textContent = `${sineCosineResult.sine}`;
    document.getElementById("cos").textContent = `${sineCosineResult.cosine}`;
    document.getElementById("log").textContent = `${logarithm(number)}`;
}

// Initialize functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    functionNames.forEach(createCheckbox);
    handleClipboardClick();
});

// Event listener for number input changes
const numberInput = document.getElementById("numberInput");
numberInput.addEventListener("input", handleNumberInputChange);

// Utility function to remove "fa-solid" class from icons
function removeClass() {
    const copyCells = document.querySelectorAll(".copy-cell");
    copyCells.forEach(cell => {
        const icon = cell.querySelector("span.fa-clipboard");
        if (icon && icon.classList.contains("fa-solid")) {
            icon.classList.remove("fa-solid");
        }
    });
}

// Utility functions for calculations (e.g., factorial, square root, cube, etc.) are assumed to be defined elsewhere.
