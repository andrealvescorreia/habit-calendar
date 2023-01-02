// this script is responsible for the visual part of the application.
// __________________________________________________________________

import {updateColorsValues, 
        txtStreak, 
        txtHabitMonthName, 
        txtSuccessPercentage, 
        dayButtons, 
        numberColor, 
        numberColorTransparent, 
        successColor, 
        failureColor} from './DOMelements.js';

import {getTodayDay, 
        calculateStreak, 
        getTodayHabitMonthId} from './utils.js';







export function themeSwitch(){
    document.body.classList.toggle("dark");
    if ( window.localStorage.getItem("theme") === "dark" ) 
        window.localStorage.setItem("theme", "light");
    else 
        window.localStorage.setItem("theme", "dark");
    updateTheme()
}


// most important function of this script.
export function updateDisplay(displayHabitMonth) {
    updateTheme()
    updateStreakDisplay(displayHabitMonth)
    updateSuccessPercentageDisplay(displayHabitMonth)
    updateDayButtonsDisplay(displayHabitMonth)
    updateHabitMonthNameDisplay(displayHabitMonth)
}

function updateTheme(){
    if(window.localStorage.getItem("theme") === "dark"){
        document.body.classList.toggle("dark", true);
    }
    updateColorsValues()
    updateBttnsTheme()
}

function updateBttnsTheme(){
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


function updateStreakDisplay(displayHabitMonth){
    let streak
    if(displayHabitMonth.getDaysArray()[getTodayDay() - 1] == 0){ 
        streak = calculateStreak(getTodayHabitMonthId(), getTodayDay() - 1)
    }else{
        streak = calculateStreak(getTodayHabitMonthId(), getTodayDay())
    }

    if(streak <= 1){
        txtStreak.innerText = ''
    }else{
        txtStreak.innerText = String(streak) + ' days Streak'
    }
}


function updateHabitMonthNameDisplay(displayHabitMonth){
    txtHabitMonthName.innerText = displayHabitMonth.getName() + ' ' + displayHabitMonth.getYear()
}


function updateSuccessPercentageDisplay(displayHabitMonth){
    // 'countOccurrences' works as a function.
    const countOccurrences = (value, array) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);
    
    const auxDaysArray = displayHabitMonth.getDaysArray()
    const numOfSuccesfulDays = countOccurrences(1, auxDaysArray)
    let succesPercentage = (numOfSuccesfulDays * 100) / auxDaysArray.length
    txtSuccessPercentage.innerText = String(parseInt(succesPercentage))
}


function updateDayButtonsDisplay(displayHabitMonth){

    dayButtons[0].style.gridColumnStart = displayHabitMonth.getFirstDayNumber() + 1; /* 1(Sunday), ... , 7(Saturday) */

    // reseting the values of all 'day' buttons to default:
    let dayCount = 0
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
    const aux = displayHabitMonth.getDaysArray()
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
        
        //if the displaying HabitMonth has already passed for the user (chronologically):
        if((new Date(getTodayHabitMonthId()+'-1')).getTime() > (new Date(displayHabitMonth.getId()+'-1')).getTime() ){
            button.style.fontWeight  = "700"
            button.style.color = numberColorTransparent
        }

        //if the displaying HabitMonth is the one the user is living at the moment:
        else if(displayHabitMonth.getId() == getTodayHabitMonthId()){ 
            if(i < getTodayDay() - 1){
                button.style.fontWeight  = "700"
                button.style.color = numberColorTransparent
            }
            else if(i == getTodayDay() - 1){
                button.style.fontWeight  = "900"
            }   
        }
    }

    // hide the 'day' bttns that are not in the HabitMonth (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)
    for (let i = 31; i > displayHabitMonth.getNumberOfDays(); i--) {
        const button = dayButtons[i - 1];
        button.innerHTML = ''
        button.style.position = "absolute"
        button.style.zIndex = "-1";
        button.disabled = true;  
    }
}
