
import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './utils/DOMelements.js';

import { switchTheme, updateTheme } from './theme/themeView.js';
import { createHabitMonthView } from './habit-month/HabitMonthView.js';
import { createHabitMonthController } from './habit-month/HabitMonthController.js';
import { createHabitMonthRenderer } from './habit-month/HabitMonthRenderer.js';
import { createHabitMonthStreakRenderer } from './habit-month/HabitMonthStreakRenderer.js';



const habitMonthController = createHabitMonthController()
const habitMonthRenderer = createHabitMonthRenderer()
const habitMonthView = createHabitMonthView()
const habitMonthStreakRenderer = createHabitMonthStreakRenderer()

habitMonthController.subscribe(habitMonthStreakRenderer.update)
habitMonthView.subscribe(habitMonthController.putIntoLocalStorage)
habitMonthView.subscribe(habitMonthRenderer.update)

habitMonthView.defaultMonth()
updateTheme()

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
        playAnimation(button)
    })
})

bttnTrashCan.addEventListener("click", ()=>{
    if (confirm("You sure? This action can't be undone!"))
        habitMonthView.clearAllDataFromCurrentlyDisplayingHabitMonth()  
})
bttnDarkModeToggle.addEventListener("click", () => {
    switchTheme()
})

function playAnimation(button){

    function removeThings(){
        button.classList.remove('success-pulse')
        button.classList.remove('success-pulse')
        button.classList.remove('transition-to-failure')
    }
    removeThings()

    if(button.classList.contains('success-state')){
        button.classList.remove('transition-to-failure')
        button.classList.toggle('success-pulse')
    } 
    else if(button.classList.contains('failure-state')){
        button.classList.remove('success-pulse')
        button.classList.toggle('transition-to-failure')
    }
    else {
        button.classList.remove('transition-to-failure')
        button.classList.remove('success-pulse')
        button.classList.toggle('transition-to-neutral')
    }
}