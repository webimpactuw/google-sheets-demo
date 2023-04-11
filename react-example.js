// Import State, Effect hooks
import React, { useState, useEffect } from 'react';

// Read script.js for more details
const API_KEY = "AIzaSyCC-Poq-9g4JbabXN6ai6bBUnMFHMJl10E";
const SHEET_ID = "1OnYvbj4DbTXXjTL8_SGNAK9b4ypUpxeGhgCfaBnvqsI";
let SHEET_NAME = "Sheet1";

// Constructing query to call the API
let url = 'https://sheets.googleapis.com/v4/spreadsheets/' + 
  SHEET_ID + '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;

function example() {
  // Store sheet data using State
  const [sheetData, setSheetData] = useState([]);
  // Runs on page load using Effect
  useEffect(() => {
    try {
      fetch(url)
        .then(res => res.text())
        .then(rep => {
          if (JSON.parse(rep)["values"] != undefined) {
            // Set sheet data to info returned from API
            setSheetData(JSON.parse(rep)["values"]);
          }                        
        })
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      {/* Set content to sheet data */}
      <div>Title: {sheetData[0][0]}</div>
      <div>Description: {sheetData[0][1]}</div>
    </>
  );
}

export default example;