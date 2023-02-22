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
        let rawHabitMonthData = JSON.parse(localStorage.getItem(id))
        if(rawHabitMonthData == null) return null
        let foundHabitMonth = HabitMonth.create(rawHabitMonthData)
        return foundHabitMonth;
    }

    function putIntoLocalStorage(habitMonth){
        localStorage.setItem(habitMonth.getId(), habitMonth.getJson())
        notifyAll(habitMonth)
    }
    
    function getStreak(habitMonthId, pivotDay){
        let habitMonthStreak = 0
        const foundHabitMonth = getFromLocalStorage(habitMonthId)
    
        if(foundHabitMonth == null) return 0
    
        for (let dayIndex = pivotDay - 1; dayIndex >= 0; dayIndex--) {
            if(foundHabitMonth.isSuccessful(dayIndex))
                habitMonthStreak++
            else 
                return habitMonthStreak
        }
    
        const previousHabitMonthId = foundHabitMonth.generatePreviousHabitMonthId()
        const lastDayOfPreviousMonth = getLastDayOfMonth(previousHabitMonthId)
        
        return habitMonthStreak + getStreak(previousHabitMonthId, lastDayOfPreviousMonth)
    
        // aux fun    
        function getLastDayOfMonth(habitMonthId){
            return HabitMonth.create({id: habitMonthId}).getQuantityOfDays();
        }
    }
    
    return{
        getFromLocalStorage, 
        putIntoLocalStorage,
        getStreak,
        subscribe     
    }
}

