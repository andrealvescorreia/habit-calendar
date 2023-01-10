import { HabitMonth } from './HabitMonth.js';
import { createHabitMonthController } from './HabitMonthController.js';
const habitMonthController = createHabitMonthController()

export function getTodayDate(){
    return new Date()
}
export function getTodayDay(){
    return getTodayDate().getDate()
}
export function getTodayHabitMonthId(){
    return String(getTodayDate().getFullYear()+ '-' + String(getTodayDate().getMonth() + 1).padStart(2, '0'));
}



export function themeSwitch(){
    document.body.classList.toggle("dark");
    if ( window.localStorage.getItem("theme") === "dark" ) 
        window.localStorage.setItem("theme", "light");
    else 
        window.localStorage.setItem("theme", "dark");
    updateTheme()
}

export function updateTheme(){
    if(window.localStorage.getItem("theme") === "dark")
        document.body.classList.toggle("dark", true)   
}






export function calculateStreak(habitMonthId, pivotDay){
    let habitMonthStreak = 0
    const habitMonth = habitMonthController.getFromLocalStorage(habitMonthId)

    if(habitMonth == null) return 0

    for (let dayIndex = pivotDay - 1; dayIndex >= 0; dayIndex--) {
        if(isSuccessfulDay(dayIndex))
            habitMonthStreak++
        else 
            return habitMonthStreak
    }

    const previousHabitMonthId = generatePreviousHabitMonthId(habitMonth)
    const lastDayOfPreviousMonth = getLastDayOfMonth(previousHabitMonthId)
    
    return habitMonthStreak + calculateStreak(previousHabitMonthId, lastDayOfPreviousMonth)


    // bellow are aux functions:
    function isSuccessfulDay(dayIndex){
        return habitMonth.getDaysArray()[dayIndex] == 1
    }
    function generatePreviousHabitMonthId(habitMonth){
        if(habitMonthIsJanuary()){
            return habitMonth.getYear() - 1 + '-12'
        }
        return habitMonth.getYear() + '-' + String(habitMonth.getNumber() - 1).padStart(2, '0')

        function habitMonthIsJanuary(){
            return habitMonth.getNumber() == 1
        }
    }
    function getLastDayOfMonth(habitMonthId){
        const auxDate = new Date(habitMonthId + '-1')
        return new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 0).getDate()
    }
}