import { dayButtons, 
         bttnHabitMonthSwitcherPrevious, 
         bttnHabitMonthSwitcherNext, 
         bttnTrashCan, 
         bttnDarkModeToggle }             from './utils/DOMelements.js';


import { createThemeView }                from './theme/themeView.js';
import { createHabitMonthView }           from './habit-month/HabitMonthView.js';
import { createHabitMonthController }     from './habit-month/HabitMonthController.js';
import { createHabitMonthRenderer }       from './habit-month/HabitMonthRenderer.js';
import { createHabitMonthStreakRenderer } from './habit-month/HabitMonthStreakRenderer.js';


const themeView = createThemeView()

const habitMonthController     = createHabitMonthController()
const habitMonthRenderer       = createHabitMonthRenderer()
const habitMonthStreakRenderer = createHabitMonthStreakRenderer()
const habitMonthView           = createHabitMonthView()

habitMonthView.subscribe(habitMonthRenderer.update)
habitMonthController.subscribe(habitMonthStreakRenderer.update)
habitMonthView.subscribe(habitMonthController.putIntoLocalStorage)

habitMonthView.changeToDefault()


// EVENT LISTENERS:

bttnHabitMonthSwitcherPrevious.addEventListener("click", ()=>{
    habitMonthView.changeToPrevious()
})
bttnHabitMonthSwitcherNext.addEventListener("click", ()=>{
    habitMonthView.changeToNext()
})

dayButtons.forEach( button =>{
    button.addEventListener("click", ()=>{
        const dayIndex = parseInt(button.innerText) - 1
        habitMonthView.switchDayState(dayIndex)
    })
})

bttnTrashCan.addEventListener("click", ()=>{
    if (confirm("You sure? This action can't be undone!"))
        habitMonthView.clearAllDataFromCurrentlyViewingMonth()  
})

bttnDarkModeToggle.addEventListener("click", () => {
    themeView.switchTheme()
})
