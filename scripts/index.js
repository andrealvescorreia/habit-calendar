// this is the script that handles user input

import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './DOMelements.js';

import {themeSwitch} from './utils.js';
import { createHabitMonthView } from './HabitMonthView.js';

const habitMonthView = createHabitMonthView()




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

bttnTrashCan.addEventListener("click", ()=>{
    if (confirm("You sure? This action can't be undone!"))
        habitMonthView.clearAllDataFromCurrentlyDisplayingHabitMonth()  
})

bttnDarkModeToggle.addEventListener("click", () => {
    themeSwitch()
})