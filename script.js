const successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
const failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
const neutralColor = String(getComputedStyle(document.body).getPropertyValue('--neutral-color'));

var displayingMonth


const dayBttns = document.querySelectorAll('.day')
dayBttns.forEach( button =>{
    button.addEventListener("click", ()=>{changeDayState(button)} )
})

const monthSwitcherPrevious = document.getElementById('month-switcher-left');
const monthSwitcherNext = document.getElementById('month-switcher-right');




// makes sure that, the default displaying month when the page is loaded, it's the one the user is living in at the moment.
const today = new Date()
const todayMonthId = String( today.getFullYear()+ '-' + String(today.getMonth() + 1).padStart(2, '0'));

const existingMonth = getMonth(todayMonthId)
if(existingMonth){
    displayingMonth = existingMonth
} 
else {
    displayingMonth = new Month(todayMonthId)
    localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());
}
updateSelectedMonthDisplay()


monthSwitcherPrevious.addEventListener("click", ()=>{
    let previousId
    if(displayingMonth.getNumber() - 1 > 0){
        previousId = displayingMonth.getYear() + '-' + String(displayingMonth.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousId = displayingMonth.getYear() - 1 + '-12'
    }
    const existingMonth = getMonth(previousId)
    if(existingMonth){
        displayingMonth = existingMonth
    } 
    else {
        newMonth = new Month(previousId)
        displayingMonth = newMonth
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());
    }
    updateSelectedMonthDisplay()
})

monthSwitcherNext.addEventListener("click", ()=>{
    let nextId
    if(displayingMonth.getNumber() + 1 <= 12){
        nextId = displayingMonth.getYear() + '-' + String(displayingMonth.getNumber() + 1).padStart(2, '0')   
    } 
    else {
        nextId = displayingMonth.getYear() + 1 + '-01'
    }
    const existingMonth = getMonth(nextId)
    if(existingMonth){
        displayingMonth = existingMonth
    } 
    else {
        newMonth = new Month(nextId)
        displayingMonth = newMonth
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());
    }
    updateSelectedMonthDisplay()
})








// ______FUNCTIONS______


function getMonth(id){// returns false if not found it
    let simpleMonth = JSON.parse(localStorage.getItem(id))
    if(simpleMonth == null) return false
    let foundMonth = new Month(simpleMonth.id, simpleMonth.daysArray)
    return foundMonth
}



function updateSelectedMonthDisplay(){
    document.getElementById('day-1').style.gridColumnStart = displayingMonth.getFirstDay()+1;/* 1(Sunday), ... , 7(Saturday) */
    document.getElementById('month-name').innerText = displayingMonth.getName()

    // reseting the values of every 'day' button.
    dayCount = 0
    dayBttns.forEach( button =>{
        dayCount++;
        button.innerHTML = dayCount;
        button.style.backgroundColor = neutralColor
        button.disabled = false
        button.style.position = "static"
        button.style.zIndex = "auto"
    })

    // updating colors of the buttons
    const aux = displayingMonth.getDaysArray()
    for(let i = 0; i < aux.length; i++){
        const button = dayBttns[i]
        button.style.backgroundColor = ( (aux[i] == 1) ? successColor : ((aux[i] == -1) ? failureColor : neutralColor) )
    }

    // hide the day bttns that are not in the month (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)
    for (let i = 31; i > displayingMonth.getNumOfDays(); i--) {
        const button = dayBttns[i - 1];
        button.innerHTML = ''
        button.style.position = "absolute"
        button.style.zIndex = "-1";
        button.disabled = true;  
    }
    updateHabitPercentage()
}


function changeDayState(dayButton){
    const day = parseInt(dayButton.getInnerHTML())
    const currentBgColor = dayButton.style.backgroundColor

    if(day > displayingMonth.getNumOfDays()) return

    if(currentBgColor == neutralColor){
        dayButton.style.backgroundColor = successColor
        displayingMonth.changeDaysArray(day-1, 1)
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());    
    }
    else if(currentBgColor == successColor){
        dayButton.style.backgroundColor = failureColor
        displayingMonth.changeDaysArray(day-1, -1)
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());
    }
    else if(currentBgColor == failureColor){
        dayButton.style.backgroundColor = neutralColor
        displayingMonth.changeDaysArray(day-1, 0)
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());   
    } 
    else return
    updateHabitPercentage()
}


function updateHabitPercentage(){
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    const auxDaysArray = displayingMonth.getDaysArray()
    const numOfSuccesfulDays = countOccurrences(auxDaysArray, 1)
    const numOfFailedDays = countOccurrences(auxDaysArray, -1)
    
    let SuccesPercentage = 0
    if(numOfSuccesfulDays + numOfFailedDays > 0){
      SuccesPercentage = (numOfSuccesfulDays * 100) / (numOfSuccesfulDays+numOfFailedDays)
    }
    document.querySelector('#succes-percentage').innerHTML = String(parseInt(SuccesPercentage))+'%'
}


/*
function allStorage() {
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}
*/