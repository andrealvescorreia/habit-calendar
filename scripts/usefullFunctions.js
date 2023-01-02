import {HabitMonth} from './HabitMonth.js'

export function getTodayDate(){
    return new Date()
}
export function getTodayDay(){
    return getTodayDate().getDate()
}
export function getTodayHabitMonthId(){
    return String(getTodayDate().getFullYear()+ '-' + String(getTodayDate().getMonth() + 1).padStart(2, '0'));
}


export function saveHabitMonthIntoLocalStorage(HabitMonth){
    localStorage.setItem(HabitMonth.getId(), HabitMonth.getJson());
}


export function getHabitMonthFromLocalStorage(id){// returns null if not found it
    let simpleHabitMonth = JSON.parse(localStorage.getItem(id))
    //let foundHabitMonth = new HabitMonth(simpleHabitMonth.id, simpleHabitMonth.daysArray)
    if(simpleHabitMonth == null) return null
    let foundHabitMonth = HabitMonth.createHabitMonth(simpleHabitMonth.id, simpleHabitMonth.daysArray)
    return foundHabitMonth;
}


export function calculateStreak(habitMonthId, pivotDay){
    let habitMonthStreak = 0
    
    const habitMonth = getHabitMonthFromLocalStorage(habitMonthId)

    if(habitMonth == null) return 0

    for (let i = pivotDay - 1; i >= 0; i--) {
        const element = habitMonth.getDaysArray()[i]
        if(element == 1){
            habitMonthStreak++
        }else{
            if(i == pivotDay - 1){
                return habitMonthStreak
            }else if(i != pivotDay - 1){
                return habitMonthStreak
            }  
        }
    }

    let previousHabitMonthId
    if(habitMonth.getNumber() - 1 > 0){
        previousHabitMonthId = habitMonth.getYear() + '-' + String(habitMonth.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousHabitMonthId = habitMonth.getYear() - 1 + '-12'
    }

    const auxDate = new Date(previousHabitMonthId + '-1')
    const lastDayOfPreviousHabitMonth = new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 0).getDate()
    
    let streak = habitMonthStreak
    streak += calculateStreak(previousHabitMonthId, lastDayOfPreviousHabitMonth)
    return streak
}