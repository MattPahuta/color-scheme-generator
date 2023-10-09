
const BASE_URL = 'https://www.thecolorapi.com/scheme?';
const colorForm = document.getElementById('color-form');

async function fetchColors(seedColor, colorMode) {
  const res = await fetch(`${BASE_URL}hex=${seedColor}&mode=${colorMode}`)
  const data = await res.json()
  console.log(data); // debug
  
  renderColors(data.colors)
    
}

// Get color input and mode selector values
function getColorValues() {
  const seedColor = document.getElementById('color-input').value.slice(1);
  const colorMode = document.getElementById('mode-select').value;
  fetchColors(seedColor, colorMode);
}

// Render colors 
function renderColors(colors) {
  const colorBars = document.getElementById('color-bars');
  let colorsHtml = '';

  // Destructure colors data? - within loop
  colors.forEach((color, i) => {
    
    colorsHtml += `
      <div id="color-${i + 1}" class="color-bar" style="background-color: ${color.hex.value};">
        <div class="color-meta" style="color: ${color.contrast.value};">
          <span class="color-hex-val">${color.hex.value}</span>
          <span class="color-name">${color.name.value}</span>
        </div>
        <i class="fa-regular fa-copy" style="color: ${color.contrast.value};"></i>
      </div>
    `
  })

  colorBars.innerHTML = colorsHtml;

}

// Add click-to-copy
// .color-bar
function addClickToCopy() {
  const colorBars = document.getElementsByClassName('color-bar');
  [...colorBars].forEach(color => {
    console.log(color)
  })
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