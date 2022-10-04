const successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
const failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
const neutralColor = String(getComputedStyle(document.body).getPropertyValue('--neutral-color'));

var months = [] // all the data is basically stored here.
var displayingMonth // a.k.a selected month by the user.


const dayBttns = document.querySelectorAll('.day')
dayBttns.forEach( button =>{
    button.addEventListener("click", ()=>{changeDayState(button)} )
})


const monthPicker = document.getElementById('month-picker');
monthPicker.addEventListener('change', () => {
    const existingMonth = getMonth(monthPicker.value)
    if(existingMonth){
        displayingMonth = existingMonth
    } 
    else {
        newMonth = new Month(monthPicker.value)
        displayingMonth = newMonth
        months.push(newMonth)
    }
    updateSelectedMonthDisplay()
});


// makes sure that, the default displaying month when the page is loaded, it's the one the user is living in at the moment.
const today = new Date()
const todayMonthId = String( today.getFullYear()+ '-' + String(today.getMonth() + 1).padStart(2, '0'));
const existingMonth = getMonth(todayMonthId)
if(existingMonth){
    displayingMonth = existingMonth
} 
else {
    displayingMonth = new Month(todayMonthId)
    months.push(displayingMonth)
}
updateSelectedMonthDisplay()











// ______FUNCTIONS______


function getMonth(id){// returns false if not found it
    let foundMonth = false
    months.forEach(month =>{
        if(month.getId() == id){
            foundMonth = month
            return
        }
    })   
    return foundMonth
}



function updateSelectedMonthDisplay(){
    document.getElementById('day-1').style.gridColumnStart = displayingMonth.getFirstDay()+1;/* 1(Sunday), ... , 7(Saturday) */
    document.getElementById('calendar-header').innerText = displayingMonth.getName()

    // reseting the values of every 'day' button.
    dayCount = 0
    dayBttns.forEach( button =>{
        dayCount++;
        button.innerHTML = dayCount;
        button.style.backgroundColor = neutralColor
        button.disabled = false
    })

    // updating colors of the buttons
    const aux = displayingMonth.getDaysArray()
    for(let i = 0; i < aux.length; i++){
        const button = dayBttns[i]
        button.style.backgroundColor = ( (aux[i] == 1) ? successColor : ((aux[i] == -1) ? failureColor : neutralColor) )
    }

    // deactivate the day bttns that are not in the month (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)
    for (let i = 31; i > displayingMonth.getNumOfDays(); i--) {
        const button = dayBttns[i - 1];
        button.disabled = true;
        button.style.backgroundColor = 'white';
        button.innerHTML = ''
    }
    updateHabitPercentage()
}

function changeDayState(dayButton){
    const day = parseInt( dayButton.getInnerHTML())
    const currentBgColor = dayButton.style.backgroundColor

    if(day > displayingMonth.getNumOfDays()) return

    if(currentBgColor == neutralColor){
        dayButton.style.backgroundColor = successColor
        displayingMonth.changeDaysArray(day-1, 1)
    }
    else if(currentBgColor == successColor){
        dayButton.style.backgroundColor = failureColor
        displayingMonth.changeDaysArray(day-1, -1)
    }
    else if(currentBgColor == failureColor){
        dayButton.style.backgroundColor = neutralColor
        displayingMonth.changeDaysArray(day-1, 0)
    }else{return}
    updateHabitPercentage()
}

function updateHabitPercentage(){
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    const auxDaysArray = displayingMonth.getDaysArray()
    const numOfSuccesfulDays = countOccurrences(auxDaysArray, 1)
    const numOfFailedDays = countOccurrences(auxDaysArray, -1)
    
    let SuccesPercentage = 0
    if(numOfSuccesfulDays + numOfFailedDays != 0){
      SuccesPercentage = (numOfSuccesfulDays * 100) / (numOfSuccesfulDays+numOfFailedDays)
    }
    document.querySelector('#succes-percentage').innerHTML = String(SuccesPercentage)+'%'
    // to-do: remove decimal places. ex: 70% instead of 70.333333%
}

/*

let obj = {
    name:'Maykzao',
    age:'29'
}

var jsonData = JSON.stringify(obj);

localStorage.setItem('obj', jsonData);

console.log(JSON.parse(localStorage.getItem('obj')))
console.log(obj)*/