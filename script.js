// Constructing query to call the API
// Key values can be found in env.js
let url = 'https://sheets.googleapis.com/v4/spreadsheets/' + 
  SHEET_ID + '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;

// Calls the function when the page loads in
document.addEventListener('DOMContentLoaded', init);

function init() {
  let card_count = 6;
  try {
    fetch(url)
      .then(res => res.text())
      .then(rep => {
        if (JSON.parse(rep)["values"] != undefined) {
          // Treat the cell data as a 2-D array
          // Access the array with "JSON.parse(rep)["values"][a][b]"
          for (let i = 1; i <= card_count; i++) {
            document.getElementById(`c${i}-title`).innerText = JSON.parse(rep)["values"][i][0];
            document.getElementById(`c${i}-desc`).innerText = JSON.parse(rep)["values"][i][1];
          }
        } else {
          for (let i = 1; i <= card_count; i++) {
            document.getElementById(`c${i}-title`).innerText = 'Failed to load!';
            document.getElementById(`c${i}-desc`).innerText = 'Failed to load!';
          }
        }                       
      })
  } catch (err) {
    // Indicate that content failed to load
    for (let i = 1; i <= card_count; i++) {
      document.getElementById(`c${i}-title`).innerText = 'Failed to load!';
      document.getElementById(`c${i}-desc`).innerText = 'Failed to load!';
    }
  }
}

