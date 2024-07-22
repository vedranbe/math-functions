/// FACTORIAL
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

/// SQUARE ROOT
function squareRoot(number) {
    // Handle invalid input (negative numbers)
    if (number < 0) {
        return -Math.pow(-number, 1 / 2);
    } else {
        return Math.pow(number, 1 / 2);
    }
}

/// CUBE ROOT
function cubeRoot(number) {
    if (number < 0) {
        return -Math.pow(-number, 1 / 3);
    } else {
        return Math.pow(number, 1 / 3);
    }
}

/// CUBE ROOT
function fourthRoot(number) {
    if (number < 0) {
        return -Math.pow(-number, 1 / 4);
    } else {
        return Math.pow(number, 1 / 4);
    }
}

/// SQUARE
function square(number) {
    return number * number;
}

/// CUBE
function cube(number) {
    return number * number * number;
}

/// CIRCLE AREA
function circleArea(number) {
    const pi = Math.PI; // Use built-in PI constant
    return pi * number * number;
}

/// SIN / COS
function calculateSineCosine(number) {
    const radians = number * Math.PI / 180; // Convert degrees to radians

    const sine = Math.sin(radians);
    const cosine = Math.cos(radians);

    return { sine, cosine };
}

/// LOG
function logarithm(number) {
    // Check if the number is positive
    if (number <= 0) {
        return "<span class='error'>Positive numbers only!</span>";
    }

    // Use Math.log() for natural logarithm
    return Math.log(number);
}

/**
 * Calculates the speed of light in kilometers per hour.
 */
function lightSpeed(number) {

    if (isNaN(number) || number <= 0) {
        return `<span class='error'>Positive numbers only!</span>`;
    } else {
        return (number * 3.6 * 299792458).toFixed(2); // 1 c = 299792458 m/s
    }
}

/**
 * Calculates the speed of sound in kilemeters per hour.
 */
function speedOfSound(temperature) {

    // Calculate speeds in m/s
    const speedInAirMps = 331.3 + 0.6 * temperature; // Speed of sound in air
    const speedInWaterMps = 1484 + 1.2 * temperature; // Example speed of sound in water
    const speedInHeliumMps = 1000 + 0.8 * temperature; // Example speed of sound in helium
    const speedInConcreteMps = 3200; // Speed of sound in concrete (constant value)
    const speedInSteelMps = 5960; // Speed of sound in steel (constant value)
    const speedInSoilMps = 150; // Speed of sound in soil (constant value)

    // Convert speeds to kph
    return {
        Air: speedInAirMps * 3.6,
        Water: speedInWaterMps * 3.6,
        Helium: speedInHeliumMps * 3.6,
        Concrete: speedInConcreteMps * 3.6,
        Steel: speedInSteelMps * 3.6,
        Soil: speedInSoilMps * 3.6
    };
}

function soundSpeed(number) {
    const speeds = speedOfSound(number);
    
    // Convert the result object to an array of [key, value] pairs
    return Object.entries(speeds).map(([key, value]) => ({
        key: key,
        value: numberWithCommas(value.toFixed(2))
    }));
    
}

// Function to populate the table
function populateTable(results) {
    const tableBody = document.querySelector('#speedOfSoundTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    results.forEach(result => {
        // Create a new row
        const row = document.createElement('tr');
        row.classList.add('visible', 'even');

        // Set the row's inner HTML
        row.innerHTML = `
            <td>${result.key}</td>
            <td class="copy-cell" title="Copy to clipboard!">
                <span id="${result.key}" class="value">${result.value}</span>
            </td>
        `;

        // Append the row to the table body
        tableBody.appendChild(row);
    });
    // Get the last three rows of the table
    const lastThreeRows = document.querySelectorAll('#speedOfSoundTable tbody tr:nth-last-child(-n+3)');

    // Add an asterisk to the first td of each row
    lastThreeRows.forEach(row => {
        const firstTd = row.querySelector('td:first-child');
        firstTd.textContent += ' *';
    });

}



