// Import State, Effect hooks
import React, { useState, useEffect } from 'react';

// Read env.js for more details
const API_KEY = '...';
const SHEET_ID = '...';
let SHEET_NAME = '...';

// Constructing query to call the API
let url = 'https://sheets.googleapis.com/v4/spreadsheets/' + 
  SHEET_ID + '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;

function example() {
  // Store sheet data using State
  const [sheetData, setSheetData] = useState([]);
  // Runs on page load using Effect hook
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
      <div>Title: {sheetData[0][0] ? 
        sheetData[0][0] : "Failed to load!"
      }</div>
      <div>Description: {sheetData[0][1] ? 
        sheetData[0][1] : "Failed to load!"
      }</div>
    </>
  );
}

export default example;