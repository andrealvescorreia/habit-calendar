// this script is responsible for the interection between the user and the habit calendar.
// __________________________________________________________________


import {HabitMonth} from './HabitMonth.js';
import {createHabitMonthController} from './HabitMonthController.js'

export function createHabitMonthView(){
    
    var currentlyDisplayingHabitMonth

    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }

    function notifyAll(habitMonth){
        for (const observerFunction of state.observers){
            observerFunction(habitMonth)
        }
    }

    
    function defaultMonth(){
        currentlyDisplayingHabitMonth = HabitMonth.createHabitMonth()
        notifyAll(currentlyDisplayingHabitMonth)
    }
    

    
    function changeDisplayingHabitMonth(habitMonthId){
        const existingHabitMonth = createHabitMonthController().getFromLocalStorage(habitMonthId)
        if(existingHabitMonth != null){
            currentlyDisplayingHabitMonth = existingHabitMonth
        } 
        else {
            let newHabitMonth = HabitMonth.createHabitMonth(habitMonthId)
            currentlyDisplayingHabitMonth = newHabitMonth
        }
        notifyAll(currentlyDisplayingHabitMonth)
    }

    
    
    function changeToPrevious(){
        let previousHabitMonthId = currentlyDisplayingHabitMonth.generatePreviousHabitMonthId()
        changeDisplayingHabitMonth(previousHabitMonthId)
    }


    function changeToNext() {
        let nextHabitMonthId = currentlyDisplayingHabitMonth.generateNextHabitMonthId()
        changeDisplayingHabitMonth(nextHabitMonthId);
    }

    function clearAllDataFromCurrentMonth(){
        const cleanHabitMonth = HabitMonth.createHabitMonth(currentlyDisplayingHabitMonth.getId())
        currentlyDisplayingHabitMonth = cleanHabitMonth
        notifyAll(currentlyDisplayingHabitMonth)
    }

    function switchDayStateOfCurrentMonth(dayIndex){
        currentlyDisplayingHabitMonth.switchDayState(dayIndex)
        notifyAll(currentlyDisplayingHabitMonth)
    }

    return{
        changeToPrevious,
        changeToNext,
        clearAllDataFromCurrentMonth,
        switchDayStateOfCurrentMonth,
        subscribe,
        defaultMonth
    }
}