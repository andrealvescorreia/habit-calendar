// this is the script that handles user input and the main logic.

import {HabitMonth} from './HabitMonth.js';

import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './DOMelements.js';

import {getTodayHabitMonthId, 
        getHabitMonthFromLocalStorage, 
        saveHabitMonthIntoLocalStorage} from './utils.js';


import {updateDisplay, 
        themeSwitch} from './display.js';



let currentlyDisplayingHabitMonth

// makes sure that, the default displaying HabitMonth when the page is loaded, it's the one the user is living on at the moment.
changeCurrentlyDisplayingHabitMonth(getTodayHabitMonthId())
updateDisplay(currentlyDisplayingHabitMonth)


// _____EVENT LISTENERS:

dayButtons.forEach( button =>{
    button.addEventListener("click", ()=>{
        switchDayBttnState(button)
        updateDisplay(currentlyDisplayingHabitMonth)
    })
});

bttnDarkModeToggle.addEventListener("click", () => {
    themeSwitch()
    updateDisplay(currentlyDisplayingHabitMonth)
});

bttnTrashCan.addEventListener("click", ()=>{
    clearDataFromCurrentlyDisplayingHabitMonth()
    updateDisplay(currentlyDisplayingHabitMonth)
});

bttnHabitMonthSwitcherPrevious.addEventListener("click", ()=>{
    let previousHabitMonthId
    if(currentlyDisplayingHabitMonth.getNumber() - 1 > 0){
        previousHabitMonthId = currentlyDisplayingHabitMonth.getYear() + '-' + String(currentlyDisplayingHabitMonth.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousHabitMonthId = currentlyDisplayingHabitMonth.getYear() - 1 + '-12'
    }
    changeCurrentlyDisplayingHabitMonth(previousHabitMonthId)
    updateDisplay(currentlyDisplayingHabitMonth) 
})

bttnHabitMonthSwitcherNext.addEventListener("click", ()=>{
    let nextHabitMonthId
    if(currentlyDisplayingHabitMonth.getNumber() + 1 <= 12){
        nextHabitMonthId = currentlyDisplayingHabitMonth.getYear() + '-' + String(currentlyDisplayingHabitMonth.getNumber() + 1).padStart(2, '0')   
    } 
    else {
        nextHabitMonthId = currentlyDisplayingHabitMonth.getYear() + 1 + '-01'
    }
    changeCurrentlyDisplayingHabitMonth(nextHabitMonthId)
    updateDisplay(currentlyDisplayingHabitMonth)
})




// ______FUNCTIONS______

// when the user uses the arrow btns to change the currently viewing HabitMonth
function changeCurrentlyDisplayingHabitMonth(HabitMonthId){
    const existingHabitMonth = getHabitMonthFromLocalStorage(HabitMonthId)
    if(existingHabitMonth != null){
        currentlyDisplayingHabitMonth = existingHabitMonth
    } 
    else {
        let newHabitMonth = HabitMonth.createHabitMonth(HabitMonthId)
        currentlyDisplayingHabitMonth = newHabitMonth
        saveHabitMonthIntoLocalStorage(currentlyDisplayingHabitMonth)
    }
}


// trash-can functionality
function clearDataFromCurrentlyDisplayingHabitMonth(){
    if (confirm("You sure? This action can't be undone!")) {
        const cleanHabitMonth = HabitMonth.createHabitMonth(currentlyDisplayingHabitMonth.getId())
        currentlyDisplayingHabitMonth = cleanHabitMonth
        saveHabitMonthIntoLocalStorage(currentlyDisplayingHabitMonth)
    }
}

// when the user clicks on a day of the calendar.
function switchDayBttnState(dayButton){
    const dayNumber = parseInt(dayButton.getInnerHTML())
    currentlyDisplayingHabitMonth.switchDayState(dayNumber - 1)
    saveHabitMonthIntoLocalStorage(currentlyDisplayingHabitMonth)   
}