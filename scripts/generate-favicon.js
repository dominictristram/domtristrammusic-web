const sharp = require('sharp');
const fs = require('fs');

// Create the favicon directory if it doesn't exist
if (!fs.existsSync('favicon')) {
    fs.mkdirSync('favicon');
}

// Define the sizes we want to generate
const sizes = [16, 32, 48, 64, 128, 256];

// Generate PNG files for each size
sizes.forEach(size => {
    sharp('images/favicon.svg')
        .resize(size, size)
        .toFile(`favicon/favicon-${size}x${size}.png`)
        .catch(err => console.error(`Error generating ${size}x${size} favicon:`, err));
});

// Generate ICO file containing multiple sizes
sharp('images/favicon.svg')
    .resize(256, 256)
    .toFile('favicon.ico')
    .catch(err => console.error('Error generating ICO file:', err)); 