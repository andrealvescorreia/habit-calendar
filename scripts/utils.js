import {HabitMonth} from './HabitMonth.js'

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

    for (let i = pivotDay - 1; i >= 0; i--) {
        const element = habitMonth.getDaysArray()[i]
        if(element == 1){
            habitMonthStreak++
        }else{
            if(i == pivotDay - 1){
                return habitMonthStreak
            }else if(i != pivotDay - 1){
                return habitMonthStreak
            }  
        }
    }

    let previousHabitMonthId
    if(habitMonth.getNumber() - 1 > 0){
        previousHabitMonthId = habitMonth.getYear() + '-' + String(habitMonth.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousHabitMonthId = habitMonth.getYear() - 1 + '-12'
    }

    const auxDate = new Date(previousHabitMonthId + '-1')
    const lastDayOfPreviousHabitMonth = new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 0).getDate()
    
    
    let totalStreak = habitMonthStreak + calculateStreak(previousHabitMonthId, lastDayOfPreviousHabitMonth)
    return totalStreak
}