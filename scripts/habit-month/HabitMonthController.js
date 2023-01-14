import {HabitMonth} from './HabitMonth.js';

export function createHabitMonthController(){
    
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

    function getFromLocalStorage(id){// returns null if not found it
        let simpleHabitMonth = JSON.parse(localStorage.getItem(id))
        if(simpleHabitMonth == null) return null
        let foundHabitMonth = HabitMonth.createHabitMonth(simpleHabitMonth.id, simpleHabitMonth.daysArray)
        return foundHabitMonth;
    }

    function putIntoLocalStorage(habitMonth){
        localStorage.setItem(habitMonth.getId(), habitMonth.getJson())
        notifyAll(habitMonth)
    }
    
    function getStreak(habitMonthId, pivotDay){
        let habitMonthStreak = 0
        const habitMonth = getFromLocalStorage(habitMonthId)
    
        if(habitMonth == null) return 0
    
        for (let dayIndex = pivotDay - 1; dayIndex >= 0; dayIndex--) {
            if(habitMonth.isSuccessful(dayIndex))
                habitMonthStreak++
            else 
                return habitMonthStreak
        }
    
        const previousHabitMonthId = habitMonth.generatePreviousHabitMonthId()
        const lastDayOfPreviousMonth = getLastDayOfMonth(previousHabitMonthId)
        
        return habitMonthStreak + getStreak(previousHabitMonthId, lastDayOfPreviousMonth)
    
    
        // bellow are aux functions:        
        function getLastDayOfMonth(habitMonthId){
            const auxDate = new Date(habitMonthId + '-1')
            return new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 0).getDate()
        }
    }
    
    return{
        getFromLocalStorage, 
        putIntoLocalStorage,
        getStreak,
        subscribe     
    }
}

