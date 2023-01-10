import {HabitMonth} from './HabitMonth.js';
import { generatePreviousHabitMonthId } from './utils.js';
export function createHabitMonthController(){
    
    function getFromLocalStorage(id){// returns null if not found it
        let simpleHabitMonth = JSON.parse(localStorage.getItem(id))
        if(simpleHabitMonth == null) return null
        let foundHabitMonth = HabitMonth.createHabitMonth(simpleHabitMonth.id, simpleHabitMonth.daysArray)
        return foundHabitMonth;
    }

    function putIntoLocalStorage(habitMonth){
        localStorage.setItem(habitMonth.getId(), habitMonth.getJson())
    }
    
    function getStreak(habitMonthId, pivotDay){
        let habitMonthStreak = 0
        const habitMonth = getFromLocalStorage(habitMonthId)
    
        if(habitMonth == null) return 0
    
        for (let dayIndex = pivotDay - 1; dayIndex >= 0; dayIndex--) {
            if(isSuccessfulDay(dayIndex))
                habitMonthStreak++
            else 
                return habitMonthStreak
        }
    
        const previousHabitMonthId = generatePreviousHabitMonthId(habitMonth)
        const lastDayOfPreviousMonth = getLastDayOfMonth(previousHabitMonthId)
        
        return habitMonthStreak + getStreak(previousHabitMonthId, lastDayOfPreviousMonth)
    
    
        // bellow are aux functions:
        function isSuccessfulDay(dayIndex){
            return habitMonth.getDaysArray()[dayIndex] == 1
        }
        
        function getLastDayOfMonth(habitMonthId){
            const auxDate = new Date(habitMonthId + '-1')
            return new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 0).getDate()
        }
    }
    
    return{
        getFromLocalStorage, 
        putIntoLocalStorage,
        getStreak        
    }
}

