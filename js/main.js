const functionNames = [
    { title: "Factorial", value: "factorial" },
    { title: "Square Root", value: "squareRoot" },
    { title: "Square", value: "square" },
    { title: "Power of 2", value: "power" },
    { title: "Circle Area", value: "circleArea" },
    { title: "Sine", value: "sine" },
    { title: "Cosine", value: "cos" },
    { title: "Logarithm", value: "log" },
];

/**
 * Updates the odd and even classes of visible rows in a table.
 */
function updateOddEvenClasses() {
    var visibleRows = document.querySelectorAll('table .visible');

    // Loop through visible rows and apply odd/even classes
    visibleRows.forEach(function (row, index) {
        row.classList.remove('odd', 'even');
        row.classList.add(index % 2 === 0 ? 'odd' : 'even');
    });
}

updateOddEvenClasses();

/** 
 * Event handling for visibility change
 */
document.querySelectorAll('.row').forEach(function (row) {
    row.addEventListener('click', function () {
        this.classList.toggle('visible');
        updateOddEvenClasses(); // Update classes on visibility change
    });
});

/**
 * Creates a checkbox element for a given function and appends it to the checkbox container.
 * @param {Object} functionInfo - An object containing the title and value of the function.
 */
function createCheckbox(functionInfo) {
    // Get the checkbox container element
    const checkboxContainer = document.getElementById("checkbox-container");

    // Create the elements
    const label = document.createElement("label"); // The label element that wraps the checkbox and title
    const checkbox = document.createElement("input"); // The checkbox element
    const spanTitle = document.createElement("span"); // The span element that contains the function title

    // Configure the checkbox
    checkbox.type = "checkbox"; // Set the type attribute to "checkbox"
    checkbox.id = functionInfo.value + "Checkbox"; // Set the id attribute to the function value followed by "Checkbox"
    checkbox.checked = true; // Set the checkbox to checked by default

    // Append the checkbox to the label before the text
    label.appendChild(checkbox);

    // Add the text content to the label
    // Create a text node with the function title
    const titleText = document.createTextNode(functionInfo.title);

    // Append the span.title and text to the label
    spanTitle.classList.add("title"); // Add the "title" class to the span
    spanTitle.appendChild(titleText); // Append the text node to the span
    label.appendChild(spanTitle); // Append the span to the label

    // Add a change event listener to the checkbox
    checkbox.addEventListener("change", function () {
        // Get the table body element
        const tableBody = document.querySelector("table tbody");

        // Get all rows in the table body that contain a cell with the id equal to the function value
        const matchingRows = Array.from(tableBody.querySelectorAll("tr"))
            .filter(row => row.querySelector(`td.copy-cell #${functionInfo.value}`));

        // Toggle the visibility of the matching rows based on the checkbox state
        matchingRows.forEach(row => row.classList.toggle("visible", this.checked));

        // Update the odd and even classes of visible rows in the table
        updateOddEvenClasses();
    });

    // Append the label to the checkbox container
    checkboxContainer.appendChild(label);
}

document.addEventListener("DOMContentLoaded", function () {
    functionNames.forEach(createCheckbox);
});


/**
 * Removes the "fa-solid" class from all icons with the class "fa-clipboard"
 * inside cells with the class "copy-cell".
 */
function removeClass() {
    // Get all cells with the class "copy-cell"
    const copyCells = document.querySelectorAll(".copy-cell");

    // Iterate over each cell
    copyCells.forEach(cell => {
        // Get the icon element with the class "fa-clipboard" inside the cell
        const icon = cell.querySelector("span.fa-clipboard");

        // Check if the icon exists and has the "fa-solid" class
        if (icon && icon.classList.contains("fa-solid")) {
            // Remove the "fa-solid" class from the icon
            icon.classList.remove("fa-solid");
        }
    });
}

const table = document.querySelector("table");
const lastColumnCells = table.querySelectorAll("tr td:last-child");

lastColumnCells.forEach(cell => {
    const icon = document.createElement("span");
    icon.classList.add("fa-regular", "fa-clipboard"); // Add initial classes
    cell.appendChild(icon);
    // Add event listener to icon
    cell.addEventListener("click", function () {
        removeClass(); // Assuming this removes any previously added classes
        icon.classList.add("fa-solid"); // Add fa-solid to the clicked cell's icon

        const span = this.querySelector("span");

        if (!navigator.clipboard) {
            // Clipboard API not supported, handle fallback (optional)
            return;
        }
        updateOddEvenClasses();

        const notificationDiv = document.createElement("div");
        notificationDiv.classList.add("clipboard-notification"); // Add custom class
        notificationDiv.textContent = navigator.clipboard.writeText(span.textContent)
            .then(() => {
                notificationDiv.textContent = "Copied to clipboard!";
            })
            .catch(err => {
                notificationDiv.textContent = "Failed to copy: " + err;
            });

        // Improved visibility and disappearance logic
        document.body.appendChild(notificationDiv); // Append to body for visibility
        notificationDiv.style.opacity = 1; // Set initial opacity to full visibility

        setTimeout(() => {
            notificationDiv.style.opacity = 0; // Fade out after 1 second
            setTimeout(() => {
                notificationDiv.remove(); // Remove from DOM after fading out
            }, 600); // Delay removal by 1000ms (1 second)
        }, 600); // Fade out after 1 second
    });
});

const numberInput = document.getElementById("numberInput");
const numberOutput = document.querySelectorAll(".numberOutput");

numberInput.addEventListener("input", function () {
    removeClass();
    this.value = this.value.slice(0, 4);
    const number = parseFloat(this.value);
    const factorialResult = factorial(number);
    const squareRootResult = squareRoot(number);
    const squareResult = square(number);
    const powerResult = Math.pow(2, number);
    const circleResult = circleArea(number);
    const sineCosineResult = calculateSineCosine(number);
    const logResult = logarithm(number);

    const isEmpty = this.value.trim() === "";
    table.style.display = isEmpty ? "none" : "block";

    numberOutput.forEach(element => {
        element.textContent = `${number}`;
    });

    document.getElementById("factorial").textContent = `${factorialResult}`;
    document.getElementById("squareRoot").innerHTML = `${squareRootResult}`;
    document.getElementById("square").textContent = `${squareResult}`;
    document.getElementById("power").textContent = `${powerResult}`;
    document.getElementById("circleArea").textContent = `${circleResult}`;
    document.getElementById("sine").textContent = `${sineCosineResult.sine}`;
    document.getElementById("cos").textContent = `${sineCosineResult.cosine}`;
    document.getElementById("log").innerHTML = `${logResult}`;
});