
var currentlyDisplayingMonth// type: Month

// COLORS:
var successColor
var failureColor
var numberColor
var numberColorTransparent

function updateColorsValues(){
    successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
    failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
    numberColor  = String(getComputedStyle(document.body).getPropertyValue('--number-color'));
    numberColorTransparent = String(getComputedStyle(document.body).getPropertyValue('--number-color-transparent'));
}
updateColorsValues()


// BUTTONS:
const dayButtons                = document.querySelectorAll('.day-button');
const bttnMonthSwitcherPrevious = document.getElementById('month-switcher-left');
const bttnMonthSwitcherNext     = document.getElementById('month-switcher-right');
const bttnTrashCan              = document.getElementById('trash-bttn')
const bttnDarkModeToggle        = document.getElementById('dark-mode-toggle');




// _____EVENT LISTENERS:

dayButtons.forEach( button =>{
    button.addEventListener("click", ()=>{
        switchDayState(button)
        updateCalendarDisplay()
    })
});

bttnDarkModeToggle.addEventListener("click", () => {
    themeSwitcher()
    updateCalendarDisplay()
});

bttnTrashCan.addEventListener("click", ()=>{
    clearDataFromCurrentlyDisplayingMonth()
    updateCalendarDisplay()
});

bttnMonthSwitcherPrevious.addEventListener("click", ()=>{
    let previousMonthId
    if(currentlyDisplayingMonth.getNumber() - 1 > 0){
        previousMonthId = currentlyDisplayingMonth.getYear() + '-' + String(currentlyDisplayingMonth.getNumber() - 1).padStart(2, '0')   
    } 
    else {
        previousMonthId = currentlyDisplayingMonth.getYear() - 1 + '-12'
    }
    changeCurrentlyDisplayingMonth(previousMonthId)
    updateCalendarDisplay()
})

bttnMonthSwitcherNext.addEventListener("click", ()=>{
    let nextMonthId
    if(currentlyDisplayingMonth.getNumber() + 1 <= 12){
        nextMonthId = currentlyDisplayingMonth.getYear() + '-' + String(currentlyDisplayingMonth.getNumber() + 1).padStart(2, '0')   
    } 
    else {
        nextMonthId = currentlyDisplayingMonth.getYear() + 1 + '-01'
    }
    changeCurrentlyDisplayingMonth(nextMonthId)
})






// makes sure that, the default displaying month when the page is loaded, it's the one the user is living on at the moment.
const today = new Date()
const todayMonthId = String( today.getFullYear()+ '-' + String(today.getMonth() + 1).padStart(2, '0'));
changeCurrentlyDisplayingMonth(todayMonthId)

// switch to dark theme if it was the theme the user was using before.
if(window.localStorage.getItem("theme") === "dark"){
    document.body.classList.toggle("dark");
    updateColorsValues()
    updateCalendarDisplay()
}










// ______FUNCTIONS______


function changeCurrentlyDisplayingMonth(monthId){
    const existingMonth = getMonth(monthId)
    if(existingMonth){
        currentlyDisplayingMonth = existingMonth
    } 
    else {
        newMonth = new Month(monthId)
        currentlyDisplayingMonth = newMonth
        localStorage.setItem(currentlyDisplayingMonth.getId(), currentlyDisplayingMonth.getJson());
    }
    updateCalendarDisplay()
}


function getMonth(id){// returns false if not found it
    let simpleMonth = JSON.parse(localStorage.getItem(id))
    if(simpleMonth == null) return false
    let foundMonth = new Month(simpleMonth.id, simpleMonth.daysArray)
    return foundMonth;
}


function updateCalendarDisplay() {
    updateSuccessPercentageDisplay()
    updateDayButtonsDisplay()
    document.getElementById('day-1').style.gridColumnStart = currentlyDisplayingMonth.getFirstDay()+1;/* 1(Sunday), ... , 7(Saturday) */
    document.getElementById('month-name').innerText = currentlyDisplayingMonth.getName() + ' ' + currentlyDisplayingMonth.getYear()
    
    const currentTheme = window.localStorage.getItem("theme")
    if(currentTheme === "light"){
        document.querySelectorAll('.bttn-svg').forEach(button =>{
            button.style.filter = "none";
        })
    }else if(currentTheme === "dark"){
        document.querySelectorAll('.bttn-svg').forEach(button =>{
            button.style.filter = "invert(100%)";
        })
    } 
}


// subfunction of 'updateCalendarDisplay()'.
function updateSuccessPercentageDisplay(){
    // 'countOccurrences' works as a function.
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    const successPercentageDisplay  = document.getElementById('success-percentage-number')
    const auxDaysArray = currentlyDisplayingMonth.getDaysArray()
    const numOfSuccesfulDays = countOccurrences(auxDaysArray, 1)
    let succesPercentage = (numOfSuccesfulDays * 100) / auxDaysArray.length
    successPercentageDisplay.innerHTML = String(parseInt(succesPercentage))
}


// subfunction of 'updateCalendarDisplay()'.
function updateDayButtonsDisplay(){

    // reseting the values of all 'day' buttons to default:
    dayCount = 0
    dayButtons.forEach( button =>{
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

    // updating colors of all the 'day' buttons:
    const aux = currentlyDisplayingMonth.getDaysArray()
    for(let i = 0; i < aux.length; i++){
        const button = dayButtons[i]
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
        if((new Date(todayMonthId+'-1')).getTime() > (new Date(currentlyDisplayingMonth.getId()+'-1')).getTime() ){
            button.style.fontWeight  = "700"
            button.style.color = numberColorTransparent
        }

        //if the displaying month is the one the user is living at the moment:
        else if(currentlyDisplayingMonth.getId() == todayMonthId){ 
            if(i < today.getDate() - 1){
                button.style.fontWeight  = "700"
                button.style.color = numberColorTransparent
            }
            else if(i == today.getDate() - 1){
                button.style.fontWeight  = "900"
            }   
        }
    }

    // hide the 'day' bttns that are not in the month (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)
    for (let i = 31; i > currentlyDisplayingMonth.getNumOfDays(); i--) {
        const button = dayButtons[i - 1];
        button.innerHTML = ''
        button.style.position = "absolute"
        button.style.zIndex = "-1";
        button.disabled = true;  
    }
}


// dark mode functionality
function themeSwitcher(){
    document.body.classList.toggle("dark");
    if ( window.localStorage.getItem("theme") === "dark" ) 
        window.localStorage.setItem("theme", "light");
    else 
        window.localStorage.setItem("theme", "dark");

    updateColorsValues()
}


// trash-can functionality
function clearDataFromCurrentlyDisplayingMonth(){
    const cleanMonth = new Month(currentlyDisplayingMonth.getId())
    localStorage.removeItem(currentlyDisplayingMonth.getId())
    currentlyDisplayingMonth = cleanMonth
}


function switchDayState(dayButton){
    const dayNumber = parseInt(dayButton.getInnerHTML())
    const currentBorderColor = dayButton.style.borderColor
    
    if(dayNumber > currentlyDisplayingMonth.getNumOfDays()) return
    
    if(dayButton.style.borderStyle == "none"){// switch to failure state.
        dayButton.style.borderStyle = "solid"
        dayButton.style.borderColor = failureColor
        currentlyDisplayingMonth.changeDaysArray(dayNumber-1, -1)
        localStorage.setItem(currentlyDisplayingMonth.getId(), currentlyDisplayingMonth.getJson());
    }
    else if(currentBorderColor == failureColor){// switch to success state. 
        dayButton.style.borderColor = successColor
        currentlyDisplayingMonth.changeDaysArray(dayNumber-1, 1)
        localStorage.setItem(currentlyDisplayingMonth.getId(), currentlyDisplayingMonth.getJson());  
    }
    else if(currentBorderColor == successColor){// switch back to neutral state.
        dayButton.style.borderStyle = "none"
        currentlyDisplayingMonth.changeDaysArray(dayNumber-1, 0)
        localStorage.setItem(currentlyDisplayingMonth.getId(), currentlyDisplayingMonth.getJson());   
    } 
    else return
}