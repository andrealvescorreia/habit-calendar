// this script is responsible for the interection between the user and the habit calendar.
// __________________________________________________________________

import {getTodayHabitMonthId} from '../utils/utils.js';

import {HabitMonth} from './HabitMonth.js';
import {createHabitMonthController} from './HabitMonthController.js'

export function createHabitMonthView(){
    const habitMonthController = createHabitMonthController()
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
        // makes sure that, the default displaying month when the page is loaded, it's the current month
        changeDisplayingHabitMonth(getTodayHabitMonthId())
    }
    

    
    function changeDisplayingHabitMonth(habitMonthId){
        const existingHabitMonth = habitMonthController.getFromLocalStorage(habitMonthId)
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

    function clearAllDataFromCurrentlyDisplayingHabitMonth(){
        const cleanHabitMonth = HabitMonth.createHabitMonth(currentlyDisplayingHabitMonth.getId())
        currentlyDisplayingHabitMonth = cleanHabitMonth
        notifyAll(currentlyDisplayingHabitMonth)
    }

    function switchDayStateOfCurrentlyDisplayingHabitMonth(dayIndex){
        currentlyDisplayingHabitMonth.switchDayState(dayIndex)
        notifyAll(currentlyDisplayingHabitMonth)
    }

    return{
        changeToPrevious,
        changeToNext,
        clearAllDataFromCurrentlyDisplayingHabitMonth,
        switchDayStateOfCurrentlyDisplayingHabitMonth,
        subscribe,
        defaultMonth
    }
}