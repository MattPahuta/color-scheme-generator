const colorInput = document.querySelector('#color-input');
const schemeSelect = document.querySelector('#scheme-select');
const countSelect = document.querySelector('#count-select')
const getColorsBtn = document.querySelector('#get-scheme-btn');
const colorResultsGrid = document.querySelector('#color-results-grid');

let seedColor = colorInput.value.substring(1);
let colorMode = schemeSelect.value;
let colorCount = countSelect.value
// let colorsMarkup = ''; // change to colorsHtml - generate starter colors on page load?

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

// get number of colors
function getColorCount(event) {
  colorCount = event.target.value;
  return colorCount;
}
countSelect.addEventListener('change', getColorCount); // update val on change

function addClickToCopy(hexCodes) {
  hexCodes.forEach((hexCode) => { // loop through and add listener
    console.log(hexCode)
    hexCode.addEventListener('click', (e) => {
      let copyText = e.target.textContent;

      navigator.clipboard.writeText(copyText).then(() => {
        alert(`${copyText} copied to clipboard!`)
      })
    })
  })  
}

function generateColors() {
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${colorMode}&count=${colorCount}`)
    .then((res) => res.json())
    .then((data) => {
      let colorsMarkup = '' // check if need this
      console.log(colorCount)
      // use map method on data.colors array to generate html
      data.colors.map((color, index) => {
        colorsMarkup += `
          <div id="bar-${index + 1}" class="color-bar" style="background-color: ${color.hex.value};">
            <p style="display:none;">${color.hex.value}</p>
          </div>
          <div class="hex-code-div flex">
            <p id="hex-${index + 1}" class="hex-code">${color.hex.value}</p>
          </div>
          `
        // return colorsMarkup // not needed?
      })
      colorResultsGrid.innerHTML = colorsMarkup;

    // add click/copy to color bar footer
    const hexCodes = [...document.querySelectorAll('.hex-code')]; // spread to array
    addClickToCopy(hexCodes);
    
  })
}

// make API call on button click, generate colors grid html
// seperate color generation into seperate function - renderColors (if possible)
// getColorsBtn.addEventListener('click', () => {
//   fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${colorMode}&count=${colorCount}`)
//     .then((res) => res.json())
//     .then((data) => {
//       let colorsMarkup = '' // check if need this
//       console.log(colorCount)
//       // use map method on data.colors array to generate html
//       data.colors.map((color, index) => {
//         colorsMarkup += `
//           <div id="bar-${index + 1}" class="color-bar" style="background-color: ${color.hex.value};">
//             <p style="display:none;">${color.hex.value}</p>
//           </div>
//           <div class="hex-code-div flex">
//             <p id="hex-${index + 1}" class="hex-code">${color.hex.value}</p>
//           </div>
//           `
//         // return colorsMarkup // not needed?
//       })
//       colorResultsGrid.innerHTML = colorsMarkup;

//     // add click/copy to color bar footer
//     const hexCodes = [...document.querySelectorAll('.hex-code')]; // spread to array
//     addClickToCopy(hexCodes);
    
//   })
// })

getColorsBtn.addEventListener('click', generateColors);

generateColors(); // call generateColors to set initial placeholder values
