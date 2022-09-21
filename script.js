const successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
const failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
const neutralColor = String(getComputedStyle(document.body).getPropertyValue('--neutral-color'));




let september = [/* 30 days */
            0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0
]/* 0: grey(neutral) | 1: green(success) | -1: red(failure) */

let firstDayOfMonth = 5// Thursday


document.getElementById('day-1').style.gridColumnStart = firstDayOfMonth;/* 1(Sunday), ... , 7(Saturday) */




const dayBttns= document.querySelectorAll('.day')

dayBttns.forEach( button =>{
    button.addEventListener("click", ()=>{changeDayState(button)} )
    button.style.backgroundColor = neutralColor
})

function changeDayState(dayButton){
    const day = parseInt( dayButton.getInnerHTML())
    const bgColor = dayButton.style.backgroundColor

    if(day > september.length) return

    if(bgColor == neutralColor){
        dayButton.style.backgroundColor = successColor
        september[day-1] = 1
    }
    else if(bgColor == successColor){
        dayButton.style.backgroundColor = failureColor
        september[day-1] = -1
    }
    else if(bgColor == failureColor){
        dayButton.style.backgroundColor = neutralColor
        september[day-1] = 0
    }else{return}
    updateHabitPercentage()
}


/* deactivate the day bttns that are not in the month (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)*/
for (let i = 31; i > september.length; i--) {
    const button = dayBttns[i - 1];
    button.disabled = true;
    button.style.backgroundColor = 'white';
    button.innerHTML = ''
}

function updateHabitPercentage(){
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    let numOfSuccesfulDays = countOccurrences(september, 1)
    let numOfFailedDays = countOccurrences(september, -1)


    let SuccesPercentage = (numOfSuccesfulDays * 100) / (numOfSuccesfulDays+numOfFailedDays)
    document.querySelector('#succes-percentage').innerHTML = String(SuccesPercentage)+'%'
}

/*let obj = {
    name:'Maykzao',
    age:'29'
}

var jsonData = JSON.stringify(obj);

localStorage.setItem('obj', jsonData);

console.log(JSON.parse(localStorage.getItem('obj')))
console.log(obj)*/