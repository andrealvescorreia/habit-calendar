import {HabitMonth} from './HabitMonth.js';

export function createHabitMonthController(){
    return{
        getFromLocalStorage(id){// returns null if not found it
            let simpleHabitMonth = JSON.parse(localStorage.getItem(id))
            if(simpleHabitMonth == null) return null
            let foundHabitMonth = HabitMonth.createHabitMonth(simpleHabitMonth.id, simpleHabitMonth.daysArray)
            return foundHabitMonth;
        },
        putIntoLocalStorage(habitMonth){
            localStorage.setItem(habitMonth.getId(), habitMonth.getJson())
        }
    }
}

