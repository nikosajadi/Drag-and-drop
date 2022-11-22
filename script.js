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

// we want to show that we have not yet loaded from local storage
// Items 
let updatedOnLoad = false; 

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

//create DOM element FOR each list Items
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  //List Item
  //creates an element,a list element specificaly adding in the class of drag item so we creating a lis element.
  const listEl = document.createElement('li');
  //after run every item in our array, here we adding our css class of drag item
  listEl.classList.add('drag-item');
  // the next thing that we add to the text item
  listEl.textContent = item
}

  // Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  //this will allow us reset and remove all of the element within our  list
  //backlogList
  backlogList.textContent = '';
  //here is run for every item in our array
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList,0 ,backlogItem,index);
  });

  //backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressListEl.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressListEl, 0, progressItem, index);
  });
  //progressListArray = filterArray(progressListArray);
  // Complete Column
  completeListEl.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeListEl, 0, completeItem, index);
  });
  //completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldListEl.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    //createItemEl(onHoldListEl, 0, onHoldItem, index);
  }); 
}
updateDOM();
