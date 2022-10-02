const successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
const failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
const neutralColor = String(getComputedStyle(document.body).getPropertyValue('--neutral-color'));

class Month {

    #id
    #daysArray

    // to-do: validate if the year-month the user gave is valid.
    constructor(id, daysArray = this.#createDaysArray(id)) {// use this constructor when creating a totally new month object   
        this.#id = id;
        this.#daysArray = daysArray;
    }

    #createDaysArray(id){
        return Array(parseInt(this.#countDaysInMonth(id))).fill(0)
    }
    #countDaysInMonth(id) { 
        const date = new Date(id + '-1')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    } 
    
   


    getNumOfDays(){
        return this.#daysArray.length
    }
    getId(){
        return this.#id
    }
    getDaysArray(){
        return this.#daysArray
    }


    getName(){
        const date = new Date(this.#id + '-1')
        return date.toLocaleString('default', { month: 'long' });
    }

    getYear(){
        const date = new Date(this.#id + '-1')
        return date.getFullYear()
    }
    getFirstDay(){// 0 (Sunday), ... , 6 (Saturday)
        const date = new Date(this.#id + '-1')
        return date.getDay()
    }

    stringify(){
        let info = ''
        info += '#id: ' + this.getId() +'\n'+
                'name(): '+ this.getName()+'\n'+
                'firstDay(): '+this.getFirstDay()+'\n'+
                'numOfDays(): '+this.getNumOfDays()+'\n'+
                '#daysArray: '+this.getDaysArray()
        return info;
        
    }


    getJson(){
        let simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        
        let jsonData = JSON.stringify(simpleMonth);
        return jsonData
    }
    
    changeDaysArray(dayIndex, newValue){
        if(newValue != 0 && newValue != 1 && newValue != -1){return}
        if(dayIndex >= this.#daysArray.lenght){return}
        
        this.#daysArray[dayIndex] = newValue;
        
        
    }

}

const dayBttns= document.querySelectorAll('.day')
dayBttns.forEach( button =>{
    
    
    button.addEventListener("click", ()=>{changeDayState(button)} )
})


let month1 = new Month('2022-09')
let month2 = new Month('2022-02')

//console.log(month.getJson())

let months = []
months.push(month1)
months.push(month2)

//alert(months[1].stringify())
let selectedMonth = months[1]
updateSelectedMonthDisplay()

const monthPicker = document.getElementById('month-picker');
monthPicker.addEventListener('change', (event) => {changed()});

function changed(){
    selectedMonth = new Month(monthPicker.value)
    updateSelectedMonthDisplay()
    updateHabitPercentage()
}


//0: grey(neutral) | 1: green(success) | -1: red(failure) 



function updateSelectedMonthDisplay(){
 document.getElementById('day-1').style.gridColumnStart = selectedMonth.getFirstDay()+1;/* 1(Sunday), ... , 7(Saturday) */
 document.getElementById('calendar-header').innerText = selectedMonth.getName()

  // reseting the values of every bttn.
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
    let numOfSuccesfulDays = countOccurrences(auxDaysArray, 1)
    let numOfFailedDays = countOccurrences(auxDaysArray, -1)
    
    let SuccesPercentage = 0
    if(numOfSuccesfulDays + numOfFailedDays != 0){
      SuccesPercentage = (numOfSuccesfulDays * 100) / (numOfSuccesfulDays+numOfFailedDays)
    }
    document.querySelector('#succes-percentage').innerHTML = String(SuccesPercentage)+'%'
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