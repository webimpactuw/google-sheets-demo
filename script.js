// Remember to restrict your API Key! 
// API keys should ideally be kept confidential (e.g. '.env' file)
const API_KEY = "AIzaSyCC-Poq-9g4JbabXN6ai6bBUnMFHMJl10E";

// The Sheet ID is the unique identifier for your Google Sheet
// It can be found near the end of the URL
const SHEET_ID = "1OnYvbj4DbTXXjTL8_SGNAK9b4ypUpxeGhgCfaBnvqsI";

// The Sheet name is the name of the sheet within the Google Sheet
// The name can be found at the bottom of the interface (default is Sheet1)
// This can be used dynamically to access data from different sheets
let SHEET_NAME = "Sheet1";

// Constructing query to call the API
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
        }                        
      })
  } catch (err) {
    // Indicate that content failed to load
    for (let i = 1; i <= card_count; i++) {
      document.getElementById(`c${i}-title`).innerText = 'Failed to load!';
      document.getElementById(`c${i}-desc`).innerText = 'Failed to load!';
    }
    console.log(err);
  }
}

