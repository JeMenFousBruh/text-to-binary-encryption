// Function to convert text to binary with enhanced encryption
function encryptText() {
    let plaintext = document.getElementById("plaintext").value;
    let key = parseInt(document.getElementById("key").value);

    // Add a salt (random number between 3 and 9) for more security
    let salt = Math.floor(Math.random() * 7) + 3; // Random number between 3 and 9

    // Initialize the output binary message array
    let binaryMessageArray = [];

    // Convert each character to its binary representation with enhanced security
    for (let i = 0; i < plaintext.length; i++) {
        let character = plaintext.charAt(i);

        // If the character is a space, replace it with a random letter
        if (character === ' ') {
            binaryMessageArray.push(getRandomLetter()); // Add random letter for spaces
            continue; // Skip to the next character
        }

        // Only process alphabetic characters (both upper and lower case)
        if (character.toUpperCase() >= 'A' && character.toUpperCase() <= 'Z') {
            // Convert character to a number (A = 1, B = 2, etc.)
            let charValue = character.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;

            // Mix with the salt for extra randomness
            charValue = (charValue + salt) % 26;
            if (charValue === 0) charValue = 26; // Wrap around if value is 0

            // Convert number to binary string
            let binaryString = charValue.toString(2);

            // Pad the binary string to the desired length (key)
            binaryString = binaryString.padStart(key, '0');

            // Add the binary string to the array
            binaryMessageArray.push(binaryString);
        }

        // Insert the salt letter every nth character
        if ((binaryMessageArray.length - binaryMessageArray.filter(x => x === '').length) % salt === 0) {
            binaryMessageArray.push(getRandomLetter()); // Add a random letter for every nth character
        }
    }

    // Join all the parts together into a single string
    let binaryMessage = binaryMessageArray.join('');

    // Insert line breaks every 133 bits
    let formattedMessage = '';
    for (let j = 0; j < binaryMessage.length; j++) {
        formattedMessage += binaryMessage.charAt(j);
        if ((j + 1) % 133 === 0) {
            formattedMessage += '\n'; // Add a newline after every 133 bits
        }
    }

    // Display the result and the salt used in the encryption
    document.getElementById("binaryOutput").innerHTML = formattedMessage.replace(/\n/g, "<br>"); // Replace newline with <br> for HTML
    document.getElementById("saltOutput").innerHTML = "Salt used: " + salt;
}

// Function to get a random letter (upper or lowercase) for spaces
function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

// Function to copy the binary message to clipboard
function copyToClipboard() {
    const binaryOutput = document.getElementById("binaryOutput").innerText; // Get the inner text
    navigator.clipboard.writeText(binaryOutput) // Use Clipboard API to copy the text
        .then(() => {
            alert("Binary message copied to clipboard!"); // Confirmation message
        })
        .catch(err => {
            console.error("Failed to copy: ", err); // Log any errors
        });
}
