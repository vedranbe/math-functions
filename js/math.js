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
    if (number <= 0) {
        return "<span class='error'>Error: Square root of a negative number is not a real number.</span>";
    }

    // Implement a basic iterative approach
    let guess = 1;
    while (guess * guess <= number) {
        guess++;
    }

    // Refine the guess for a desired precision
    const precision = 100; // Adjust for desired number of decimal places (100 for 2 decimals)
    for (let i = 0; i < precision; i++) {
        guess = (guess + number / guess) / 2;
    }

    // Round the result to 2 decimal places using toFixed(2)
    return guess;
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
        return "<span class='error'>Error: Logarithm is not defined for non-positive numbers</span>";
    }

    // Use Math.log() for natural logarithm
    return Math.log(number);
}