import { dayButtons, 
         bttnPreviousHabitMonth, 
         bttnNextHabitMonth, 
         bttnTrashCan, 
         bttnDarkModeToggle }         from './utils/DOMelements.js';


import { createThemeController }      from './theme/themeController.js';
import { createHabitMonthController } from './habit-month/HabitMonthController.js';
import { createHabitMonthView }       from './habit-month/HabitMonthView.js';
import { createHabitMonthStreakView } from './habit-month/HabitMonthStreakView.js';


const themeController = createThemeController()

const habitMonthView       = createHabitMonthView()
const habitMonthStreakView = createHabitMonthStreakView()
const habitMonthController = createHabitMonthController()

habitMonthController.subscribe(habitMonthView.update)
habitMonthController.subscribe(habitMonthStreakView.update)

habitMonthController.changeToDefault()

// EVENT LISTENERS:

bttnPreviousHabitMonth.addEventListener("click", ()=> {
    habitMonthController.changeToPrevious()
})
bttnNextHabitMonth.addEventListener("click", ()=> {
    habitMonthController.changeToNext()
})

dayButtons.forEach( button => {
    button.addEventListener("click", ()=> {
        const dayIndex = parseInt(button.innerText) - 1
        habitMonthController.switchDayState(dayIndex)
    })
})

bttnTrashCan.addEventListener("click", ()=> {
    if (confirm("Erase this month's data?"))
        habitMonthController.clearAllDataFromViewingMonth()  
})

bttnDarkModeToggle.addEventListener("click", () => {
    themeController.switchTheme()
})