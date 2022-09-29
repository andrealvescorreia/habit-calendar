const successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
const failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
const neutralColor = String(getComputedStyle(document.body).getPropertyValue('--neutral-color'));

class Month {

    #id
    #daysArray

    // to-do: validate if the year-month the user gave is valid.
    constructor(id) {// use this constructor when creating a totally new month object   
        this.#id = id;
        this.#daysArray = this.#createDaysArray();
    }

    constructor(id, daysArray) {// use this if you are retrieving info from previously created month, for exemple a month from a json.
        this.#id = id;
        this.#daysArray = daysArray;
    }

    #createDaysArray(){
        return Array(parseInt(this.#countDaysInMonth())).fill(0)
    }
    #countDaysInMonth() { 
        const date = new Date(this.#id + '-1')
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
        info += '#id: ' + this.#id
    }


    getJson(){
        let simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        
        let jsonData = JSON.stringify(simpleMonth);
        return jsonData
    }

}



let month = new Month('2022-09')
console.log(month.getNumOfDays() + ' '+month.getName() +' '+ month.getYear())
console.log(month.getDaysArray())
console.log(month.getFirstDay())
console.log(month.getJson())


const monthPicker = document.getElementById('month-picker');
monthPicker.addEventListener('change', (event) => {changed()});

function changed(){
    console.log(monthPicker.value )
}



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
    const currentBgColor = dayButton.style.backgroundColor

    if(day > september.length) return

    if(currentBgColor == neutralColor){
        dayButton.style.backgroundColor = successColor
        september[day-1] = 1
    }
    else if(currentBgColor == successColor){
        dayButton.style.backgroundColor = failureColor
        september[day-1] = -1
    }
    else if(currentBgColor == failureColor){
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
/*


let obj = {
    name:'Maykzao',
    age:'29'
}

var jsonData = JSON.stringify(obj);

localStorage.setItem('obj', jsonData);

console.log(JSON.parse(localStorage.getItem('obj')))
console.log(obj)*/