// this is the script that handles user input

import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './DOMelements.js';

import {themeSwitch} from './utils.js';
import {updateTheme} from './display.js';
import { createHabitMonthView } from './habitMonthView.js';

const habitMonthView = createHabitMonthView()


bttnDarkModeToggle.addEventListener("click", () => {
    themeSwitch()
    updateTheme()
})

bttnTrashCan.addEventListener("click", ()=>{
    if (confirm("You sure? This action can't be undone!"))
        habitMonthView.clearAllDataFromCurrentlyDisplayingHabitMonth()  
})

bttnHabitMonthSwitcherPrevious.addEventListener("click", ()=>{
    habitMonthView.changeToPreviousMonth()
})

bttnHabitMonthSwitcherNext.addEventListener("click", ()=>{
    habitMonthView.changeToNextMonth()
})


dayButtons.forEach( button =>{
    button.addEventListener("click", ()=>{
        const dayIndex = parseInt(button.innerText) - 1
        habitMonthView.switchDayStateOfCurrentlyDisplayingHabitMonth(dayIndex)
    })
})
