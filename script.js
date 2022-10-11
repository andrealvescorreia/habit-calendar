var successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
var failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
var numberColor  = String(getComputedStyle(document.body).getPropertyValue('--number-color'));
var numberColorTransparent = String(getComputedStyle(document.body).getPropertyValue('--number-color-transparent'));


var displayingMonth


const dayBttns = document.querySelectorAll('.day')
dayBttns.forEach( button =>{
    button.addEventListener("click", ()=>{changeDayState(button)} )
})

const successPercentageNumberDisplay = document.getElementById('succes-percentage-number')
const monthSwitcherPrevious = document.getElementById('month-switcher-left');
const monthSwitcherNext = document.getElementById('month-switcher-right');
const trashCan = document.getElementById('trash-bttn')
const darkModeToggle = document.getElementById('dark-mode-toggle');


darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (window.localStorage.getItem("theme") === "dark") {
        window.localStorage.setItem("theme", "light");
    } else {
        window.localStorage.setItem("theme", "dark")
    }
    updateDisplayTheme()
});

trashCan.addEventListener("click", ()=>{clearDisplayingMonth()});


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

if(window.localStorage.getItem("theme") === "dark"){
    document.body.classList.toggle("dark");
    updateDisplayTheme()
}

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
    document.getElementById('month-name').innerText = displayingMonth.getName() + ' ' + displayingMonth.getYear()

    // reseting the values of every 'day' button to default.
    dayCount = 0
    dayBttns.forEach( button =>{
        dayCount++;
        button.innerText= dayCount;
        button.disabled = false
        button.style.position = "static"
        button.style.zIndex = "auto"
        button.style.borderColor = "transparent"
        button.style.fontWeight = "normal"  
        button.style.opacity = "1"
        button.style.color = numberColor  
    })

    // updating colors of the buttons
    const aux = displayingMonth.getDaysArray()
    for(let i = 0; i < aux.length; i++){
        const button = dayBttns[i]
        
        button.style.borderStyle = "solid"
        if((aux[i] == 1)){    
            button.style.borderColor = successColor
        } else if(aux[i] == -1){
            button.style.borderColor = failureColor
        }
        else{
            button.style.borderStyle = "none"
        }
        
        //if the displaying month has already passed for the user (chronologically):
        if((new Date(todayMonthId+'-1')).getTime() > (new Date(displayingMonth.getId()+'-1')).getTime() ){
            button.style.fontWeight  = "700"
            button.style.color = numberColorTransparent
        }

        //if the displaying month is the one the user is living at the moment:
        else if(displayingMonth.getId() == todayMonthId){ 
            if(i < today.getDate() - 1){
                button.style.fontWeight  = "700"
                button.style.color = numberColorTransparent
            }
            else if(i == today.getDate() - 1){
                button.style.fontWeight  = "700"
            }   
        }
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


function updateDisplayTheme(){
    numberColor = String(getComputedStyle(document.body).getPropertyValue('--number-color'));
    numberColorTransparent = String(getComputedStyle(document.body).getPropertyValue('--number-color-transparent'));
    const currentTheme = window.localStorage.getItem("theme")
    if(currentTheme === "light"){
        document.querySelectorAll('.bttn-svg').forEach(button =>{
            button.style.filter = "none"
        })
    }else if(currentTheme === "dark"){
        document.querySelectorAll('.bttn-svg').forEach(button =>{
            button.style.filter = "invert(100%)"
        })
    }
    updateSelectedMonthDisplay()
}

function clearDisplayingMonth(){// trashCan
    const cleanMonth = new Month(displayingMonth.getId())
    localStorage.removeItem(displayingMonth.getId())
    displayingMonth = cleanMonth
    updateSelectedMonthDisplay()
}

function changeDayState(dayButton){
    const day = parseInt(dayButton.getInnerHTML())
    const currentBorderColor = dayButton.style.borderColor
    
    if(day > displayingMonth.getNumOfDays()) return
    
    if(dayButton.style.borderStyle == "none"){
        dayButton.style.borderStyle = "solid"
        dayButton.style.borderColor = failureColor
        displayingMonth.changeDaysArray(day-1, -1)
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());
    }
    else if(currentBorderColor == failureColor){     
        dayButton.style.borderColor = successColor
        displayingMonth.changeDaysArray(day-1, 1)
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());  
    }
    else if(currentBorderColor == successColor){
        dayButton.style.borderStyle = "none"
        displayingMonth.changeDaysArray(day-1, 0)
        localStorage.setItem(displayingMonth.getId(), displayingMonth.getJson());   
    } 
    else return
    updateHabitPercentage()
}


function updateHabitPercentage(){
    
    // 'countOccurrences' works as a function.
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    const auxDaysArray = displayingMonth.getDaysArray()
    const numOfSuccesfulDays = countOccurrences(auxDaysArray, 1)
    const numOfFailedDays = countOccurrences(auxDaysArray, -1)
    
    let SuccesPercentage = 0
    if(numOfSuccesfulDays + numOfFailedDays > 0){
      SuccesPercentage = (numOfSuccesfulDays * 100) / (numOfSuccesfulDays+numOfFailedDays)
    }
    successPercentageNumberDisplay.innerHTML = String(parseInt(SuccesPercentage))
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