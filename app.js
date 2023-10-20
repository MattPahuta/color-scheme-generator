const BASE_URL = 'https://www.thecolorapi.com/scheme?hex=';
const colorForm = document.getElementById('color-form');
const colorInput = document.getElementById('color-input');

async function fetchColors(seedColor, colorMode) {
  const res = await fetch(`${BASE_URL}${seedColor}&mode=${colorMode}`)
  const data = await res.json()
  console.log(data); // debug
  render(data.colors)
}

// Get color input and mode selector values
function getColorValues() {
  const seedColor = colorInput.value.slice(1);
  const colorMode = document.getElementById('mode-select').value;
  fetchColors(seedColor, colorMode);
}

// Render colors 
function render(colors) {
  // apply selected color to app border
  document.getElementById('app-container').style.borderColor = colorInput.value;

  let colorsHtml = '';
  // Destructure colors data? - within loop
  // Use createElement instead of innerHtml?
  colors.forEach((color, i) => { 
    colorsHtml += `
      <div id="color-${i + 1}" class="color-bar" style="background-color: ${color.hex.value};">
        <div class="color-meta" style="color: ${color.contrast.value};">
          <span class="color-code">${color.hex.value}</span>
          <span class="color-name">${color.name.value}</span>
        </div>
        <i class="fa-regular fa-copy" style="color: ${color.contrast.value};"></i>
      </div>
    `
  });
  // apply colors html to container
  document.getElementById('color-bars').innerHTML = colorsHtml;
  addClickToCopy(); // add click handlers to rendered colors for copy/paste
}

// *** ToDo: 
/*
  - revise fetch function to utilize URLSearchParams 
  - add data attributes to generated color bars to hold hex code (data-hex)
  - add tab index to generated color bars to allow for tab=>enter=>copy (tabindex="0")
*/

// Add click-to-copy
function addClickToCopy() {
  const colorBars = document.getElementsByClassName('color-bar');
  [...colorBars].forEach(color => {
    console.log(color)
    color.addEventListener('click', () => {
      const colorCode = color.querySelector('.color-code').textContent;
      navigator.clipboard.writeText(colorCode);
      // handle dialog message
      const copyDialog = document.querySelector('#copy-dialog');
      copyDialog.textContent = `${colorCode} copied.`;
      copyDialog.show();
      setTimeout(() => {
        copyDialog.close();
      }, 1500)
    });
  });
}

// Event listener
colorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getColorValues();
})

colorForm.reset();
getColorValues();