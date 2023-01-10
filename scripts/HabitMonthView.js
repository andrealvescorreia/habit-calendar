// this script is responsible for the interection between the user and the application.
// __________________________________________________________________

import {getTodayHabitMonthId, 
        generatePreviousHabitMonthId, 
        generateNextHabitMonthId} from './utils.js';

import {HabitMonth} from './HabitMonth.js';
import {createHabitMonthController} from './HabitMonthController.js'
import {updateDisplay} from './display.js';

export function createHabitMonthView(){
    const habitMonthController = createHabitMonthController()
    let currentlyDisplayingHabitMonth
    // makes sure that, the default displaying month when the page is loaded, it's the current month
    changeDisplayingHabitMonth(getTodayHabitMonthId())
    updateDisplay(currentlyDisplayingHabitMonth)


    function changeDisplayingHabitMonth(habitMonthId){
        const existingHabitMonth = habitMonthController.getFromLocalStorage(habitMonthId)
        if(existingHabitMonth != null){
            currentlyDisplayingHabitMonth = existingHabitMonth
        } 
        else {
            let newHabitMonth = HabitMonth.createHabitMonth(habitMonthId)
            currentlyDisplayingHabitMonth = newHabitMonth
            habitMonthController.putIntoLocalStorage(currentlyDisplayingHabitMonth)
            
        }
        updateDisplay(currentlyDisplayingHabitMonth)
    }

    
    
    function changeToPreviousMonth(){
        let previousHabitMonthId = generatePreviousHabitMonthId(currentlyDisplayingHabitMonth)
        changeDisplayingHabitMonth(previousHabitMonthId)
    }


    function changeToNextMonth() {
        let nextHabitMonthId = generateNextHabitMonthId(currentlyDisplayingHabitMonth)
        changeDisplayingHabitMonth(nextHabitMonthId);
    }

    function clearAllDataFromCurrentlyDisplayingHabitMonth(){
        const cleanHabitMonth = HabitMonth.createHabitMonth(currentlyDisplayingHabitMonth.getId())
        currentlyDisplayingHabitMonth = cleanHabitMonth
        habitMonthController.putIntoLocalStorage(currentlyDisplayingHabitMonth)
        updateDisplay(currentlyDisplayingHabitMonth)
    }

    function switchDayStateOfCurrentlyDisplayingHabitMonth(dayIndex){
        currentlyDisplayingHabitMonth.switchDayState(dayIndex)
        habitMonthController.putIntoLocalStorage(currentlyDisplayingHabitMonth)
        updateDisplay(currentlyDisplayingHabitMonth)
    }

    return{
        changeToPreviousMonth,
        changeToNextMonth,
        clearAllDataFromCurrentlyDisplayingHabitMonth,
        switchDayStateOfCurrentlyDisplayingHabitMonth
    }
}