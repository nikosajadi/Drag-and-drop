const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
// whenever we add something to a column
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items

// Initialize Arrays
//this is going to store the data for each of our lists 
let backlogListArray = [];
let progressListArray =[];
let completeListArray = [];
let onHoldListArray = [];
//is just going to be an array of all these other arrays
let listArrays = [];

//get Arrays from localStorage if available, set defult values if not
function  getSavedColumns() {
    // here is checking to see if backlog items exists in localStorage
    if (localStorage.getItem('backlogItems')) {
        // The JSON.parse() method parses a JSON string, it takses a Jason string and constructs it back into a javaScript object.
        // the first part we should get bookmark from localStorage if available
        backlogListArray= JSON.parse(localStorage.getItem('backlogListArray'));
        progressListArray= JSON.parse(localStorage.getItem('progressListArray'));
        completeListArray= JSON.parse(localStorage.getItem('completeListArray'));
        onHoldListArray= JSON.parse(localStorage.getItem('onHoldListArray'));
    } else {
        //create bookmarks array in localStorage
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
}
}
//for test we call this function
getSavedColumns();
updateSavedColumns();

//set the value here and saving this value into localStorage
//Set the value
function updateSavedColumns() {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((arrayName, index) => {
      localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    });
    //localStorage.setItem('backlog', JSON.stringify(backlogListArray));
    //localStorage.setItem('progress', JSON.stringify(progressListArray));
    
  }
