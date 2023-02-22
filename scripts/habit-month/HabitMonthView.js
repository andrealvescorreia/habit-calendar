// this script is responsible for the interection between the user and the habit calendar.
// __________________________________________________________________


import {HabitMonth} from './HabitMonth.js';
import {createHabitMonthController} from './HabitMonthController.js'

export function createHabitMonthView(){
    
    var currentlyViewingHabitMonth

    const state = {
        observers: []
    }
    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    function notifyAll(habitMonth){
        for (const observerFunction of state.observers){
            observerFunction(habitMonth.clone())
        }
    }

    
    function changeToDefault(){
        const defaultId = HabitMonth.create({}).getId()
        changeDisplayingHabitMonth(defaultId)
    }
    
    function changeDisplayingHabitMonth(habitMonthId){
        const existingHabitMonth = createHabitMonthController().getFromLocalStorage(habitMonthId)
        if(existingHabitMonth != null){
            currentlyViewingHabitMonth = existingHabitMonth
        } 
        else {
            let newHabitMonth = HabitMonth.create({id: habitMonthId})
            currentlyViewingHabitMonth = newHabitMonth
        }
        notifyAll(currentlyViewingHabitMonth)
    }
    
    function changeToPrevious(){
        let previousHabitMonthId = currentlyViewingHabitMonth.generatePreviousHabitMonthId()
        changeDisplayingHabitMonth(previousHabitMonthId)
    }


    function changeToNext() {
        let nextHabitMonthId = currentlyViewingHabitMonth.generateNextHabitMonthId()
        changeDisplayingHabitMonth(nextHabitMonthId);
    }

    function clearAllDataFromCurrentlyViewingMonth(){
        const cleanHabitMonth = HabitMonth.create({id: currentlyViewingHabitMonth.getId()})
        currentlyViewingHabitMonth = cleanHabitMonth
        notifyAll(currentlyViewingHabitMonth)
    }

    function switchDayState(dayIndex){
        currentlyViewingHabitMonth.switchDayState(dayIndex)
        notifyAll(currentlyViewingHabitMonth)
    }

    return{
        changeToPrevious,
        changeToNext,
        clearAllDataFromCurrentlyViewingMonth,
        switchDayState,
        subscribe,
        changeToDefault
    }
}