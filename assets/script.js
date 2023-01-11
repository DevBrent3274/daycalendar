// Variables defined
  
  let saveButton = $('.saveBtn');
  let timeBlock = $('.time-block');
  let description = $('.description');
  let currentHour = moment().hour();
  let currentDay = moment().format('dddd, MMMM Do YYYY');
  let currentDayClass = $('#currentDay');
  let workHours = [];
  let container = $('.container');
  let pText;
// Code to display the current date in the header of the page.  Pulled from moment 
// and relayed to currentDayClass through currentDay
  currentDayClass.text(currentDay);
  
  function createWorkHours() {
    $(document).ready(function() {
//  Loop to create elements for the page
      for (i = 9; i <= 17; i++) {
      workHours = [moment().hour(i).format('h A')];
      newRow = $('<section>').attr('class', 'row time-block').attr({id: (i)});
      newDiv = $('<div>').attr('class', 'col-2 col-md-1 hour text-center py-3').attr({id: 'div-' + i});
      newTextLine = $('<textarea>').attr('class', 'col-8 col-md-10 description border border-dark').attr('rows', '3').attr({id: 'pgraph-' + (i)}).text('');
      newButton = $('<button>').attr('class', 'btn saveBtn col-2 col-md-1').attr('aria-label', 'save').attr({id: 'button-' + i});
  
      newI = $('<i>').attr('class', 'fas fa-upload fa-2x').attr({id: 'icon-' + (i)});
//  Code to add elements to the page
      container.append(newRow);
      newRow.append(newDiv);
      newRow.append(newTextLine);
      newRow.append(newButton);
      newDiv.append(workHours);
      newButton.append(newI);
  
      const rowID = parseInt($(newRow).attr('id'));
// Code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. 
      if (currentHour > i) {
        newTextLine.addClass('past')
      } else if (currentHour < rowID) {
        newTextLine.addClass('future')
      } else {
        newTextLine.addClass('present')
      }
  
      const inputVal = localStorage.getItem('button-' + i);
      newTextLine.val(inputVal)
      }
    })
  }
  
  // Calling the function to build out day calendar and display dynamically 
  createWorkHours();
  
  // Coding to save user input when button is clicked into local storage using the id to set location
  container.on('click', ".saveBtn", function(e) {
  let buttonId = $(this).attr('id')
  pText = $(this).prev().val()
  localStorage.setItem(buttonId, (pText))
  e.preventDefault();
  })
