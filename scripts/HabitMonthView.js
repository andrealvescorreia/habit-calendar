import {getTodayHabitMonthId} from './utils.js';
import {HabitMonth} from './HabitMonth.js';
import {createHabitMonthController} from './HabitMonthController.js'
import {updateDisplay} from './display.js';

export function createHabitMonthView(){
    const habitMonthController = createHabitMonthController()
    let currentlyDisplayingHabitMonth
    // makes sure that, the default displaying month when the page is loaded, it's the one the user is living on at the moment.
    changeCurrentlyDisplayingHabitMonth(getTodayHabitMonthId())
    updateDisplay(currentlyDisplayingHabitMonth)


    function changeCurrentlyDisplayingHabitMonth(habitMonthId){
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

    function getCurrentlyDisplayingHabitMonth() {return currentlyDisplayingHabitMonth}
    
    function changeToPreviousMonth(){
        let previousHabitMonthId
        if(currentlyDisplayingHabitMonth.getNumber() - 1 > 0){
            previousHabitMonthId = currentlyDisplayingHabitMonth.getYear() + '-' + String(currentlyDisplayingHabitMonth.getNumber() - 1).padStart(2, '0')   
        } 
        else {
            previousHabitMonthId = currentlyDisplayingHabitMonth.getYear() - 1 + '-12'
        }
        changeCurrentlyDisplayingHabitMonth(previousHabitMonthId)
    }


    function changeToNextMonth() {
        let nextHabitMonthId;
        if (currentlyDisplayingHabitMonth.getNumber() + 1 <= 12) {
            nextHabitMonthId = currentlyDisplayingHabitMonth.getYear() + '-' + String(currentlyDisplayingHabitMonth.getNumber() + 1).padStart(2, '0');
        }
        else {
            nextHabitMonthId = currentlyDisplayingHabitMonth.getYear() + 1 + '-01';
        }
        changeCurrentlyDisplayingHabitMonth(nextHabitMonthId);
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
        getCurrentlyDisplayingHabitMonth,
        changeToPreviousMonth,
        changeToNextMonth,
        clearAllDataFromCurrentlyDisplayingHabitMonth,
        switchDayStateOfCurrentlyDisplayingHabitMonth
    }

    
}