
import {dayButtons, 
        bttnHabitMonthSwitcherPrevious, 
        bttnHabitMonthSwitcherNext, 
        bttnTrashCan, 
        bttnDarkModeToggle} from './utils/DOMelements.js';

import { getTodayDay } from './utils/dateUtils.js';

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
        habitMonthView.switchDayStateOfCurrentMonth(dayIndex)
        playAnimation(button)
    })
})

bttnTrashCan.addEventListener("click", ()=>{
    if (confirm("You sure? This action can't be undone!"))
        habitMonthView.clearAllDataFromCurrentMonth()  
})
bttnDarkModeToggle.addEventListener("click", () => {
    switchTheme()
})

function playAnimation(button){

    function removeThings(){
        button.classList.remove('success-pulse')
        button.classList.remove('transition-to-failure')
        button.classList.remove('transition-to-neutral')
        button.classList.remove('transition-to-neutral-today')
        button.classList.remove('success-pulse-today')
    }
    removeThings()




    if(button.classList.contains('success-state')){
        if(button.innerText == getTodayDay()){
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
        if(button.innerText == getTodayDay()){
            button.classList.toggle('transition-to-neutral-today')
        }else{
            button.classList.toggle('transition-to-neutral')
        }
        
    }
}