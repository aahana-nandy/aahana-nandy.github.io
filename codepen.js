const colorButton = document.getElementById('color-button');
const root = document.documentElement;

// array of colors for rotation  in degrees
const hueValues = [
    '0deg',    
    '150deg',  
    '270deg',  
    '45deg'    
];

let colorIndex = 0;

colorButton.addEventListener('click', () => {
    
    //  cycle through the colorss
    colorIndex = (colorIndex + 1) % hueValues.length;
    
    const newHue = hueValues[colorIndex];
    
    // update main wave color
    root.style.setProperty('--wave-hue', newHue);
    
    // change button color too
    colorButton.style.backgroundColor = `hsl(${newHue.replace('deg', '')}, 60%, 40%)`;
});