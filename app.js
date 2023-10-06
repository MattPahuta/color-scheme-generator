
const BASE_URL = 'https://www.thecolorapi.com/scheme?';
const colorForm = document.getElementById('color-form');

async function fetchColors(seedColor, colorMode) {
  const res = await fetch(`${BASE_URL}hex=${seedColor}&mode=${colorMode}`)
  const data = await res.json()
  console.log(data)
  
  renderColors(data.colors)
    
}

// Get color input and mode selector values
function getColorValues() {
  const seedColor = document.getElementById('color-input').value.slice(1);
  const colorMode = document.getElementById('mode-select').value;
  fetchColors(seedColor, colorMode);
}


function renderColors(colors) {
  const colorBars = document.getElementById('color-bars');
  let colorsHtml = '';

  colors.forEach((color, i) => {
    colorsHtml += `
      <div id="color-${i + 1}" class="color-bar" style="background-color: ${color.hex.value};">
      </div>
    `
  })

  colorBars.innerHTML = colorsHtml;

}




// *** ToDo: create getFormData function?
// Event listener
colorForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // const seedColor = document.getElementById('color-input').value.slice(1);
  // const colorMode = document.getElementById('mode-select').value;
  // console.log(seedColor)
  // console.log(colorMode)

  // fetchColors(seedColor, colorMode)

  getColorValues();

})

getColorValues();

// fetchColors();

// ToDo: Add form reset on page load? 
// document.getElementById('color-form').reset();