// Global variables
const colorForm = document.getElementById('color-form');
const colorInput = document.getElementById('color-input');


// Get colors from API v2.0
async function getColors() {
  // reference user input values
  const seedColor = colorInput.value;
  const colorMode = document.getElementById('mode-select').value;
  // build search query paramaters
  const params = {
    hex: seedColor,
    mode: colorMode
  };
  // build query string for use in API call
  // utilize URLSearchParams constructor w/toString method
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const queryString = new URLSearchParams(params).toString();
  // build URL for API call
  const url = `https://www.thecolorapi.com/scheme?${queryString}`;
  // fetch color data from API
  const res = await fetch(url);
  const data = await res.json();
  console.log(data) // debug
  const { colors } = data; // extract colors from data object
  // call render function, pass in colors array
  render(colors)

}


// Render colors 
function render(colors) {
  // apply selected color to app border
  document.getElementById('app-container').style.borderColor = colorInput.value;

  let colorsHtml = '';
  // Use createElement instead of innerHtml?
  colors.forEach((color, i) => { 
    console.log(color) // debug
    const { hex, contrast, name} = color;
    colorsHtml += `
      <div class="color-bar" style="background-color: ${hex.value};" tabindex="0" data-hex=${hex.value}>
        <div class="color-meta" style="color: ${contrast.value};">
          <span class="color-code">${hex.value}</span>
          <span class="color-name">${name.value}</span>
        </div>
        <i class="fa-regular fa-copy" style="color: ${contrast.value};"></i>
      </div>
    `
  });
  // apply colors html to container
  document.getElementById('color-bars').innerHTML = colorsHtml;
  addClickToCopy(); // add click handlers to rendered colors for copy/paste
}

// *** ToDo: 
/*
  - add data attributes to generated color bars to hold hex code (data-hex)
  - add tab index to generated color bars to allow for tab=>enter=>copy (tabindex="0")
  - revise copy function to react to clicks and enter
*/

// Add click-to-copy - v1.0
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
  getColors();
})

colorForm.reset();
getColors();