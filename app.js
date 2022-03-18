
/*
Basic fetch request format:
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

  Example scheme
  https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6

  Get a single hex value
  'https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=analogic&count=5'
   
  data => console.log(data.colors[0].hex.value

  color modes:
  monochrome 
  monochrome-dark 
  monochrome-light 
  analogic 
  complement
  analogic-complement 
  triad 

*/
const baseURL = 'https://www.thecolorapi.com/';
// variables for: hex=${hexVal}, mode=${colorMode}
const colorInput = document.querySelector('#color-input');
const schemeSelect = document.querySelector('#scheme-select');
const getColorsBtn = document.querySelector('#get-scheme-btn');


// let hexVal = 'F55A5A';
// let mode = 'monochrome';

let colorsArray = [];

// wrap this in a function - called when 'Get color scheme' button is clicked
// 2 params - hexVal, mode
function getColors(hexVal, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexVal}&format=json&mode=${mode}`)
    .then(res => res.json())
    // .then(data => console.log(data.colors))
    .then(data => data.colors.forEach(function (color) {
      colorsArray.push(color.hex.value);
    }))
}

colorInput.addEventListener('change', () => {
  colorsArray = [];
})

schemeSelect.addEventListener('change', () => {
  colorsArray = [];
})


getColorsBtn.addEventListener('click', () => {
  console.log(`Input val: ${colorInput.value}, Mode: ${schemeSelect.value}`)
  getColors(colorInput.value.substring(1), schemeSelect.value)
})

  // .then(data => data.colors.forEach(function (color) {
  //   console.log(color.hex.value)
  // }));

// colors[0].hex.value

/*
// event listener - color picked <input type="color" - "seed color"
// event listener - color scheme <select> value
// event listener - button - getColorScheme, make call to the API
// function renderColors - render colors and hex values to the page
*/
