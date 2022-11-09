function getTodayDate(){
    return new Date()
}
function getTodayDay(){
    return getTodayDate().getDate()
}
function getTodayMonthId(){
    return String(getTodayDate().getFullYear()+ '-' + String(getTodayDate().getMonth() + 1).padStart(2, '0'));
}


function saveMonthIntoLocalStorage(month){
    localStorage.setItem(month.getId(), month.getJson());
}


function getMonthFromLocalStorage(id){// returns null if not found it
    let simpleMonth = JSON.parse(localStorage.getItem(id))
    //let foundMonth = new Month(simpleMonth.id, simpleMonth.daysArray)
    if(simpleMonth == null) return null
    let foundMonth = Month.createMonth(simpleMonth.id, simpleMonth.daysArray)
    return foundMonth;
}


function calculateStreak(monthId, pivotDay){
    let monthStreak = 0
    
    const month = getMonthFromLocalStorage(monthId)

    if(month == null) return 0

    for (let i = pivotDay - 1; i >= 0; i--) {
        const element = month.getDaysArray()[i]
        if(element == 1){
            monthStreak++
        }else{
            if(i == pivotDay - 1){
                return monthStreak
            }else if(i != pivotDay - 1){
                return monthStreak
            }  
        }
    }

    let previousMonthId
    if(month.getNumber() - 1 > 0){
        previousMonthId = month.getYear() + '-' + String(month.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousMonthId = month.getYear() - 1 + '-12'
    }

    const auxDate = new Date(previousMonthId + '-1')
    const lastDayOfPreviousMonth = new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 0).getDate()
    
    streak = monthStreak
    streak += calculateStreak(previousMonthId, lastDayOfPreviousMonth)
    return streak
}