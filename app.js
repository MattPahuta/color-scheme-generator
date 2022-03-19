/*
  Example scheme
  https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6

  Get a single hex value
  'https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=analogic&count=5'
   
  variables for: hex=${hexVal}, mode=${colorMode}
*/

const colorInput = document.querySelector('#color-input');
const schemeSelect = document.querySelector('#scheme-select');
const countSelect = document.querySelector('#count-select');
const getColorsBtn = document.querySelector('#get-scheme-btn');

const colorResultsGrid = document.querySelector('#color-results-grid');

let seedColor = colorInput.value.substring(1);
let colorMode = schemeSelect.value;
// let colorCount = countSelect.value; // future feature
// let colorsMarkup = ''; // change to colorsHTML - generate starter colors on page load?

// get new seedColor value
function getSeedColor(event) {
  seedColor = event.target.value.substring(1); // use just schemSelect.value?
  return seedColor;
}
colorInput.addEventListener('change', getSeedColor); // update val on change

// get new colorMode value
function getColorMode(event) {
  colorMode = event.target.value;
  return colorMode;
}
schemeSelect.addEventListener('change', getColorMode); // update val on change

// function getColorCount(event) {
//   colorCount = event.targe.value;
//   return colorCount;
// }

// make API call on button click, generate colors grid html
// seperate color generation into seperate function - renderColors (if possible)
getColorsBtn.addEventListener('click', () => {
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${colorMode}&count=5`)
    .then((res) => res.json())
    .then((data) => {
      let colorsMarkup = '' // check if need this
      // use map method on data.colors array to generate html
      data.colors.map((color, index) => {
        colorsMarkup += `
          <div id="bar-${index + 1}" class="color-bar" style="background-color: ${color.hex.value};">
            <p style="display:none;">${color.hex.value}</p>
          </div>
          <div class="hex-code-div flex">
            <p id="hex-${index + 1}">${color.hex.value}</p>
          </div>
          `
        // return colorsMarkup // not needed?
      })
      colorResultsGrid.innerHTML = colorsMarkup;

  })
})




