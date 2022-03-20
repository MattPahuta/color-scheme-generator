const colorInput = document.querySelector('#color-input');
const schemeSelect = document.querySelector('#scheme-select');
const countSelect = document.querySelector('#count-select')
const getColorsBtn = document.querySelector('#get-scheme-btn');
const colorResultsGrid = document.querySelector('#color-results-grid');
let seedColor = colorInput.value.substring(1);
let colorMode = schemeSelect.value;
let colorCount = countSelect.value

// get new seedColor value
function getSeedColor(e) {
  seedColor = e.target.value.substring(1);
  return seedColor;
}
colorInput.addEventListener('change', getSeedColor); // update val on change

// get new colorMode value
function getColorMode(e) {
  colorMode = e.target.value;
  return colorMode;
}
schemeSelect.addEventListener('change', getColorMode); // update val on change

// get number of colors
function getColorCount(e) {
  colorCount = e.target.value;
  return colorCount;
}
countSelect.addEventListener('change', getColorCount); // update val on change

function addClickToCopy(hexCodes) {
  hexCodes.forEach((hexCode) => { // loop through and add listener
    // console.log(hexCode) // debugging
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
      let colorsHtml = ''
      // console.log(colorCount) // debugging
      // use map method on data.colors array to generate html
      data.colors.map((color, index) => {
        colorsHtml += `
          <div id="bar-${index + 1}" class="color-bar" style="background-color: ${color.hex.value};">
            <span style="display:none;">${color.hex.value}</span>
          </div>
          <div class="hex-code-div flex">
            <p id="hex-${index + 1}" class="hex-code">${color.hex.value}</p>
          </div>
          `
      })
      colorResultsGrid.innerHTML = colorsHtml;
      // get generated hexCodes and pass to addClickToCopy function
      const hexCodes = [...document.querySelectorAll('.hex-code')]; // spread to array
      addClickToCopy(hexCodes);
  })
}

// add event listener to getColorsBtn
getColorsBtn.addEventListener('click', generateColors);
generateColors(); // call generateColors to set initial placeholder values
