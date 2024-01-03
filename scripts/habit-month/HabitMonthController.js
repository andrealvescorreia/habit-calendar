// this script is responsible for the interection between the user and the habit calendar.
// __________________________________________________________________


import {HabitMonth} from './HabitMonth.js';

export function createHabitMonthController(){
    
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
        changeDisplayingHabitMonth(HabitMonth.generateTodaysId())
    }
    
    function changeDisplayingHabitMonth(habitMonthId){
        const existingHabitMonth = HabitMonth.get(habitMonthId)
        if(existingHabitMonth){
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

    function clearAllDataFromViewingMonth(){
        const cleanHabitMonth = HabitMonth.create({id: currentlyViewingHabitMonth.id})
        currentlyViewingHabitMonth = cleanHabitMonth
        currentlyViewingHabitMonth.saveInLocalStorage()
        notifyAll(currentlyViewingHabitMonth)
    }

    function switchDayStateAt(dayIndex){
        currentlyViewingHabitMonth.switchDayStateAt(dayIndex)
        currentlyViewingHabitMonth.saveInLocalStorage()
        notifyAll(currentlyViewingHabitMonth)
    }

    return{
        changeToPrevious,
        changeToNext,
        clearAllDataFromViewingMonth,
        switchDayStateAt,
        subscribe,
        changeToDefault
    }
}