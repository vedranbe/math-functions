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
    { title: "Speed of Light", value: "lightSpeed" },
    { title: "Speed of Sound", value: "soundSpeed" },
];

const primeMessage = document.getElementById("primeMessage");

function numberWithCommas(x) {
    // Split the number into integer and decimal parts
    const [integerPart, decimalPart] = x.toString().split(".");

    // Format the integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted integer and decimal part
    return `${formattedInteger}${decimalPart ? "." + decimalPart : ""}`;
}



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

    // Set up the checkbox event listener
    document.querySelector('#soundSpeedCheckbox').addEventListener('change', toggleTableVisibility);

    // Initialize visibility based on checkbox state
    toggleTableVisibility();
});


/**
 * Removes the "fa-solid" class from all icons with the class "fa-clipboard"
 * inside cells with the class "copy-cell".
 */
function removeClass() {

    const copyCells = document.querySelectorAll(".copy-cell");

    if (copyCells.length > 0) {
        copyCells.forEach(cell => {
            const icon = cell.querySelector("span.fa-clipboard");
            if (icon && icon.classList.contains("fa-solid")) {
                icon.classList.remove("fa-solid");
            }
        });
    }
}

const numberInput = document.getElementById("numberInput");
const numberOutput = document.querySelectorAll(".numberOutput");

numberInput.addEventListener('keypress', (event) => {
    const char = String.fromCharCode(event.which || event.keyCode);
    const inputValue = numberInput.value;

    // Allow only numbers, minus sign at the beginning, and one dot
    if (
        // Allow numbers and minus at the beginning
        (char >= '0' && char <= '9') ||
        (char === '-' && inputValue === '') ||

        // Allow dot only if not already present
        (char === '.' && inputValue.indexOf('.') === -1)
    ) {
        document.getElementById("main").style.display = 'table'; // Show table
        return; // Allow the character
    } else {
        document.getElementById("main").style.display = 'none'; // Hide table
    }

    event.preventDefault(); // Prevent invalid characters
});

numberInput.addEventListener("input", function () {
    removeClass();
    this.value = this.value.slice(0, 5);
    const number = parseFloat(this.value);
    const factorialResult = factorial(number);
    const squareRootResult = squareRoot(number);
    const cubeRootResult = cubeRoot(number);
    const fourthRootResult = fourthRoot(number);
    const squareResult = numberWithCommas(square(number));
    const cubeResult = numberWithCommas(cube(number));
    const powerResult = numberWithCommas(Math.pow(2, number));
    const circleResult = numberWithCommas(circleArea(number));
    const sineCosineResult = calculateSineCosine(number);
    const logResult = logarithm(number);
    const lightSpeedResult = numberWithCommas(lightSpeed(number));

    numberOutput.forEach(element => {
        element.textContent = `${number}`;
    });

    document.getElementById("factorial").textContent = `${factorialResult}`;
    document.getElementById("squareRoot").innerHTML = `${squareRootResult}`;
    document.getElementById("cubeRoot").innerHTML = `${cubeRootResult}`;
    document.getElementById("fourthRoot").innerHTML = `${fourthRootResult}`;
    document.getElementById("square").textContent = `${squareResult}`;
    document.getElementById("cube").textContent = `${cubeResult}`;
    document.getElementById("power").textContent = `${powerResult}`;
    document.getElementById("circleArea").textContent = `${circleResult}`;
    document.getElementById("sine").textContent = `${sineCosineResult.sine}`;
    document.getElementById("cos").textContent = `${sineCosineResult.cosine}`;
    document.getElementById("log").innerHTML = `${logResult}`;
    document.getElementById("lightSpeed").innerHTML = `${lightSpeedResult}`;

    // Populate table for Speed of sound
    const results = soundSpeed(number);
    populateTable(results);
    toggleTableVisibility();

    clipboardCopy();

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

    
});
// Function to toggle the visibility of the table based on checkbox
function toggleTableVisibility() {
    const checkbox = document.querySelector('#soundSpeedCheckbox');
    const table = document.querySelector('#speedOfSoundTable');
    const numberInput = document.querySelector('#numberInput');

    // Get the value from the numberInput and convert it to a float
    const number = parseFloat(numberInput.value);

    // Show or hide the table based on checkbox state and positive numberInput value
    if (checkbox.checked && !isNaN(number)) {
        table.style.display = 'table'; // Show table
    } else {
        table.style.display = 'none'; // Hide table
    }
    updateOddEvenClasses();
}

function clipboardCopy() {
        const tables = document.querySelectorAll(".table");
            tables.forEach(table => {
            const lastColumnCells = table.querySelectorAll("tbody tr td:last-child");
                // Check if lastColumnCells has elements
                if (lastColumnCells.length > 0) {
                    console.log(lastColumnCells);
                    // Your other code for each table
                } else {
                    console.error('No last column cells found in table:', table);
                }

            lastColumnCells.forEach(cell => {
                // Check if the cell already has a span with the class "fa-clipboard"
                const existingIcon = cell.querySelector('span.fa-clipboard');

                if (!existingIcon) {
                    const icon = document.createElement("span");
                    icon.classList.add("fa-regular", "fa-clipboard");
                    cell.appendChild(icon);
                }
                // Add event listener to icon
                cell.addEventListener("click", function () {
                    removeClass(); // Assuming this removes any previously added classes
                    const icon = this.querySelector('.fa-clipboard');
                    if (icon) {
                        icon.classList.add('fa-solid');
                    }

                    const span = this.querySelector("span");

                    if (!navigator.clipboard) {
                        // Clipboard API not supported, handle fallback (optional)
                        return;
                    }

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
                            const elementsWithFaRegular = document.querySelectorAll('.fa-regular');

                            elementsWithFaRegular.forEach(element => {
                                element.classList.remove('fa-solid');
                            });
                        }, 600); // Delay removal by 600ms
                    }, 600); // Fade out after 600ms

                    updateOddEvenClasses();
                });
            });
        });
}

