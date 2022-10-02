const successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
const failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
const neutralColor = String(getComputedStyle(document.body).getPropertyValue('--neutral-color'));


/*
let months = []
months.push(month1)
months.push(month2)*/

var selectedMonth = new Month('2022-02')

const dayBttns = document.querySelectorAll('.day')
dayBttns.forEach( button =>{
    button.addEventListener("click", ()=>{changeDayState(button)} )
})



const monthPicker = document.getElementById('month-picker');
monthPicker.addEventListener('change', () => {
    selectedMonth = new Month(monthPicker.value)
    updateSelectedMonthDisplay()
    updateHabitPercentage()
});

updateSelectedMonthDisplay()






function updateSelectedMonthDisplay(){
    document.getElementById('day-1').style.gridColumnStart = selectedMonth.getFirstDay()+1;/* 1(Sunday), ... , 7(Saturday) */
    document.getElementById('calendar-header').innerText = selectedMonth.getName()

    // reseting the values of every 'day' button.
    dayCount = 0
    dayBttns.forEach( button =>{
        dayCount++;
        button.innerHTML = dayCount;
        button.style.backgroundColor = neutralColor
        button.disabled = false
    })


    // deactivate the day bttns that are not in the month (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)
    for (let i = 31; i > selectedMonth.getNumOfDays(); i--) {
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

    if(day > selectedMonth.getNumOfDays()) return

    if(currentBgColor == neutralColor){
        dayButton.style.backgroundColor = successColor
        selectedMonth.changeDaysArray(day-1, 1)
    }
    else if(currentBgColor == successColor){
        dayButton.style.backgroundColor = failureColor
        selectedMonth.changeDaysArray(day-1, -1)
    }
    else if(currentBgColor == failureColor){
        dayButton.style.backgroundColor = neutralColor
        selectedMonth.changeDaysArray(day-1, 0)
    }else{return}
    updateHabitPercentage()
}

function updateHabitPercentage(){
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    const auxDaysArray = selectedMonth.getDaysArray()
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