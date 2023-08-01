# Google Sheets Demo
This sample project is an example of how you can integrate the Google Sheets API into your project! 

### How It Works
* Google provides free (but limited) usage to their API
* The client (webpage) fetches data using an API key and info for a Google Sheets
* Once returned, the client reads in the information and modifies the page accordingly

## Getting Started

### Preparing the API
1) Visit [console.cloud.google.com](http://console.cloud.google.com)
2) Select an account and create a project
3) In the console search bar, look up "Google Sheets API"
4) Select the API and enable it
5) Under the 'Credentials' tab (in the API info sidebar), select 'Create Credentials' -> 'API Key'
6) Select the created API key from the list of API keys
7) (Optional) Rename the API key to 'Sheets API'
8) Add a restriction to the Google Sheets API and Save
> You can also specify a restriction to a website; useful if you know the URL of your deployment

### Creating a Google Sheets
1) Create a Google Sheets file
2) Under 'Share', enable 'Anyone with the link' the view the file
3) Copy the Spreadsheet ID (a string found near the end of the URL
> ...docs.google.com/spreadsheets/d/ <b>SPREADSHEET_ID</b> /edit...
4) Take note of the Sheet names used
> Sheet names can be found at bottom-left of a Google Sheets. The default is 'Sheet1'

### Setting up the client (HTML/JS)
0) See ``script.js`` of this repo for an example
1) In the HTML file, create a div with an id: ``<div id="title-1"></div>``
2) Add links to JavaScript files in the head: 
> ``<script src="env.js"></script>``
> 
> ``<script src="script.js"></script>``
3) Create the JS scripts: ``env.js``, ``script.js``
> Make sure that the script sources point to the correct path!
4) In ``script.js``, prepare an API call (see ``env.js`` for more info)
5) Create a function to run upon page load:
> ``document.addEventListener('DOMContentLoaded', loadData);``
> 
> In this case, the function ``loadData()`` would be called upon page load
6) In the function, fetch the sheet data to insert into the div's text:
```
try {
    fetch(url)
        .then(res => res.text())
        .then(rep => { ...
```
> ``document.getElementById("title-1").innerText = JSON.parse(rep)["values"][A][B];``
> 
> We parse the returned JSON from the API as a 2-D array. In this case, we are reading row A and column B
7) Repeat the modification with other sheet cells as needed


### Setting up the client (React)
1) In a component's JS file, import ``useState`` and ``useEffect``
2) Prepare an API call in the corresponding JS file (see ``script.js`` in the repo)
3) In the component, create a state variable (array): ``const [sheetData, setSheetData] = useState([]);``
> This is one way to implement this. You can also just use a `let` variable since we don't modify it once it's been set
5) Use the effect hook to call the API and read in the data (see ``useEffect()`` in ``react-example.js``)
6) In the return function, read in the state variable as text (e.g. ``<div>{sheetData[A][B]}</div>``)
> We parse the returned JSON from the API as a 2-D array. In this case, we are reading row A and column B

### Notes
* Google Sheet cells are 1-indexed while JS arrays are 0-indexed!
* It's helpful to include include "Loading..." and "Failed to load!" placeholder texts to inform the user of loading/errors
* Exposing your API key to a public repository on GitHub is not recommended. 
  * Consider using an alternative hosting service (i.e. [Vercel](https://vercel.com))
