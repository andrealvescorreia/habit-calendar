import { createHabitMonthController } from './HabitMonthController.js';
const habitMonthController = createHabitMonthController()

import {getTheme, setTheme} from './themeController.js';

export function getTodayDate(){
    return new Date()
}
export function getTodayDay(){
    return getTodayDate().getDate()
}
export function getTodayHabitMonthId(){
    return String(getTodayDate().getFullYear()+ '-' + String(getTodayDate().getMonth() + 1).padStart(2, '0'));
}



export function switchTheme(){
    document.body.classList.toggle("dark");
    if (themeIsDark()) 
        setTheme("light")
    else 
        setTheme("dark")

    updateTheme()
}

export function updateTheme(){
    if(themeIsDark())
        document.body.classList.toggle("dark", true) 
}

function themeIsDark(){
    return getTheme() === "dark"
}




export function generatePreviousHabitMonthId(habitMonth){
    if(habitMonthIsJanuary())
        return habitMonth.getYear() - 1 + '-12'
    return habitMonth.getYear() + '-' + String(habitMonth.getNumber() - 1).padStart(2, '0')

    function habitMonthIsJanuary(){
        return habitMonth.getNumber() == 1
    }
}

export function generateNextHabitMonthId(habitMonth){
    if(habitMonthIsDecember())
        return habitMonth.getYear() + 1 + '-01';
    return habitMonth.getYear() + '-' + String(habitMonth.getNumber() + 1).padStart(2, '0');
    
    function habitMonthIsDecember(){
        return habitMonth.getNumber() == 12
    }
}