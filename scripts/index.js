// this is the script that handles user input

import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './DOMelements.js';

import {switchTheme, updateTheme} from './utils.js';
import { createHabitMonthView } from './HabitMonthView.js';
import { createHabitMonthController } from './HabitMonthController.js';
import { createHabitMonthRenderer } from './HabitMonthRenderer.js';

updateTheme()


const habitMonthController = createHabitMonthController()
const habitMonthRenderer = createHabitMonthRenderer()
const habitMonthView = createHabitMonthView()

habitMonthView.subscribe(habitMonthController.putIntoLocalStorage)
habitMonthView.subscribe(habitMonthRenderer.update)
habitMonthView.defaultMonth()

bttnHabitMonthSwitcherPrevious.addEventListener("click", ()=>{
    habitMonthView.changeToPrevious()
})

bttnHabitMonthSwitcherNext.addEventListener("click", ()=>{
    habitMonthView.changeToNext()
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
    switchTheme()
})