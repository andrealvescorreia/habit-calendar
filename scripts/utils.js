export function getTodayDate(){
    return new Date()
}
export function getTodayDay(){
    return getTodayDate().getDate()
}
export function getTodayHabitMonthId(){
    return String(getTodayDate().getFullYear()+ '-' + String(getTodayDate().getMonth() + 1).padStart(2, '0'));
}

export function generatePreviousHabitMonthId(habitMonth){
    if(habitMonthIsJanuary())
        return habitMonth.getYear() - 1 + '-12'
    return habitMonth.getYear() + '-' + String(habitMonth.getNumber() - 1).padStart(2, '0')

    function habitMonthIsJanuary(){
        return habitMonth.getNumber() == 1
    }
}

export function generateNextHabitMonthId(habitMonth){
    if(habitMonthIsDecember())
        return habitMonth.getYear() + 1 + '-01';
    return habitMonth.getYear() + '-' + String(habitMonth.getNumber() + 1).padStart(2, '0');
    
    function habitMonthIsDecember(){
        return habitMonth.getNumber() == 12
    }
}