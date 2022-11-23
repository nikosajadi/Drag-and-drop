const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
// whenever we add something to a column
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListEl = document.getElementById('backlog-list');
const progressListEl = document.getElementById('progress-list');
const completeListEl = document.getElementById('complete-list');
const onHoldListEl = document.getElementById('on-hold-list');

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
//Drag Functionality 
//it is not going to be set any things because it is going to be replaced in that function
let draggedItem;

//get Arrays from localStorage if available, set defult values if not
function getSavedColumns() {
    // here is checking to see if backlog items exists in localStorage
    if (localStorage.getItem('backlogItems')) {
        // The JSON.parse() method parses a JSON string, it takses a Jason string and constructs it back into a javaScript object.
        // the first part we should get bookmark from localStorage if available
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems); 
 

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
  console.log('columnEl:', columnEl);
  console.log('column:', column);
  console.log('item:', item);
  console.log('index:', index);
  //List Item
  //creates an element,a list element specificaly adding in the class of drag item so we creating a lis element.
  const listEl = document.createElement('li');
  //after run every item in our array, here we adding our css class of drag item
  listEl.classList.add('drag-item');
  // the next thing that we add to the text item
  listEl.textContent = item;
  //Make an Element Draggable
  listEl.draggable = true;
  listEl.setAttribute('ondragstrart', 'drag(event');
  // we going to Append child and use list element
  //next step Append 
  columnEl.appendChild(listEl);
}

  // Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  //this will allow us reset and remove all of the element within our  list
  //backlogList
  backlogListEl.textContent = '';
  //here is run for every item in our array
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogListEl, 0, backlogItem, index);
  });

  //backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressListEl.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressListEl, 1, progressItem, index);
  });
  //progressListArray = filterArray(progressListArray);
  // Complete Column
  completeListEl.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeListEl, 2, completeItem, index);
  });
  //completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldListEl.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldListEl, 3, onHoldItem, index);
  }); 
}


//when I tem Start Dragging
// that is going to show us the target of the event that we just triggered
function drag(e){
  draggedItem = e.target;
  console.log('draggedItem' , draggedItem);
}




updateDOM();
