// this is the script that represents the user inputs and logic of the application.

let currentlyDisplayingMonth// type: Month


// makes sure that, the default displaying month when the page is loaded, it's the one the user is living on at the moment.
changeCurrentlyDisplayingMonth(getTodayMonthId())
updateDisplay(currentlyDisplayingMonth)


// _____EVENT LISTENERS:

dayButtons.forEach( button =>{
    button.addEventListener("click", ()=>{
        switchDayBttnState(button)
        updateDisplay(currentlyDisplayingMonth)
    })
});

bttnDarkModeToggle.addEventListener("click", () => {
    themeSwitch()
    updateDisplay(currentlyDisplayingMonth)
});

bttnTrashCan.addEventListener("click", ()=>{
    clearDataFromCurrentlyDisplayingMonth()
    updateDisplay(currentlyDisplayingMonth)
});

bttnMonthSwitcherPrevious.addEventListener("click", ()=>{
    let previousMonthId
    if(currentlyDisplayingMonth.getNumber() - 1 > 0){
        previousMonthId = currentlyDisplayingMonth.getYear() + '-' + String(currentlyDisplayingMonth.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousMonthId = currentlyDisplayingMonth.getYear() - 1 + '-12'
    }
    changeCurrentlyDisplayingMonth(previousMonthId)
    updateDisplay(currentlyDisplayingMonth) 
})

bttnMonthSwitcherNext.addEventListener("click", ()=>{
    let nextMonthId
    if(currentlyDisplayingMonth.getNumber() + 1 <= 12){
        nextMonthId = currentlyDisplayingMonth.getYear() + '-' + String(currentlyDisplayingMonth.getNumber() + 1).padStart(2, '0')   
    } 
    else {
        nextMonthId = currentlyDisplayingMonth.getYear() + 1 + '-01'
    }
    changeCurrentlyDisplayingMonth(nextMonthId)
    updateDisplay(currentlyDisplayingMonth)
})




// ______FUNCTIONS______

// when the user uses the arrow btns to change the currently viewing month
function changeCurrentlyDisplayingMonth(monthId){
    const existingMonth = getMonthFromLocalStorage(monthId)
    if(existingMonth != null){
        currentlyDisplayingMonth = existingMonth
    } 
    else {
        newMonth = Month.createMonth(monthId)
        currentlyDisplayingMonth = newMonth
        saveMonthIntoLocalStorage(currentlyDisplayingMonth)
    }
}


// trash-can functionality
function clearDataFromCurrentlyDisplayingMonth(){
    const cleanMonth = Month.createMonth(currentlyDisplayingMonth.getId())
    currentlyDisplayingMonth = cleanMonth
    saveMonthIntoLocalStorage(currentlyDisplayingMonth)
}

// when the user clicks on a day of the calendar.
function switchDayBttnState(dayButton){
    const dayNumber = parseInt(dayButton.getInnerHTML())
    currentlyDisplayingMonth.switchDayState(dayNumber - 1)
    saveMonthIntoLocalStorage(currentlyDisplayingMonth)   
}