
import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './utils/DOMelements.js';

import { isToday } from './utils/dateUtils.js';

import { switchTheme, updateTheme } from './theme/themeView.js';
import { createHabitMonthView } from './habit-month/HabitMonthView.js';
import { createHabitMonthController } from './habit-month/HabitMonthController.js';
import { createHabitMonthRenderer } from './habit-month/HabitMonthRenderer.js';
import { createHabitMonthStreakRenderer } from './habit-month/HabitMonthStreakRenderer.js';

updateTheme()


const habitMonthController = createHabitMonthController()
const habitMonthRenderer = createHabitMonthRenderer()
const habitMonthStreakRenderer = createHabitMonthStreakRenderer()
const habitMonthView = createHabitMonthView()

habitMonthController.subscribe(habitMonthStreakRenderer.update)
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
        habitMonthView.switchDayStateOfCurrentMonth(dayIndex)
        playStateAnimation(button)
    })
})

bttnTrashCan.addEventListener("click", ()=>{
    if (confirm("You sure? This action can't be undone!"))
        habitMonthView.clearAllDataFromCurrentMonth()  
})
bttnDarkModeToggle.addEventListener("click", () => {
    switchTheme()
})

function playStateAnimation(button){
    const dayOfTheButton = button.innerText
    removeAnyAnimationClass(button)

    if(button.classList.contains('success-state')){
        
        if(isToday(dayOfTheButton)){
            button.classList.toggle('success-pulse-today')
        }
        else{
            button.classList.toggle('success-pulse')
        }   
        
    } 
    else if(button.classList.contains('failure-state')){
        button.classList.toggle('transition-to-failure')
    }
    else {
        if(isToday(dayOfTheButton)){
            button.classList.toggle('transition-to-neutral-today')
        }else{
            button.classList.toggle('transition-to-neutral')
        }   
    }

    function removeAnyAnimationClass(button){
        button.classList.remove('success-pulse')
        button.classList.remove('transition-to-failure')
        button.classList.remove('transition-to-neutral')
        button.classList.remove('transition-to-neutral-today')
        button.classList.remove('success-pulse-today')
    }
}