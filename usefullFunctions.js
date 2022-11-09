function getTodayDate(){
    return new Date()
}
function getTodayDay(){
    getTodayDate().getDate()
}
function getTodayMonthId(){
    return String(getTodayDate().getFullYear()+ '-' + String(getTodayDate().getMonth() + 1).padStart(2, '0'));
}
function saveMonthIntoLocalStorage(month){
    localStorage.setItem(month.getId(), month.getJson());
}


function getMonthFromLocalStorage(id){// returns false if not found it
    let simpleMonth = JSON.parse(localStorage.getItem(id))
    if(simpleMonth == null) return false
    let foundMonth = new Month(simpleMonth.id, simpleMonth.daysArray)
    return foundMonth;
}

function themeSwitcher(){
    document.body.classList.toggle("dark");
    if ( window.localStorage.getItem("theme") === "dark" ) 
        window.localStorage.setItem("theme", "light");
    else 
        window.localStorage.setItem("theme", "dark");
}

function calculateStreak(monthId, pivotDay){
    let monthStreak = 0
    
    const month = getMonthFromLocalStorage(monthId)
    if(month == false) return

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