// this script is responsible for the visual part of the application.
// __________________________________________________________________

import { 
        txtStreak, 
        txtHabitMonthName, 
        txtSuccessPercentage, 
        dayButtons,
        allBttnsWIthSvg} from './DOMelements.js';

import {getTodayDay, 
        calculateStreak, 
        getTodayHabitMonthId} from './utils.js';










// most important function of this script.
export function updateDisplay(displayHabitMonth) {
    updateTheme()
    updateStreakDisplay(displayHabitMonth)
    updateSuccessPercentageDisplay(displayHabitMonth)
    updateDayButtonsDisplay(displayHabitMonth)
    updateHabitMonthNameDisplay(displayHabitMonth)
}

export function updateTheme(){
    if(window.localStorage.getItem("theme") === "dark")
        document.body.classList.toggle("dark", true)   
}


function updateStreakDisplay(displayHabitMonth){
    if(displayHabitMonth.getId() != getTodayHabitMonthId()) {
        txtStreak.innerText = ''
        return
    }

    let streak
    if(displayHabitMonth.getDaysArray()[getTodayDay() - 1] == 0)
        streak = calculateStreak(getTodayHabitMonthId(), getTodayDay() - 1)
    else
        streak = calculateStreak(getTodayHabitMonthId(), getTodayDay())

    if(streak <= 1)
        txtStreak.innerText = ''
    else
        txtStreak.innerText = String(streak) + ' days Streak'
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
    updateGridStart();
    resetDayBttnsToDefault();
    hideDaysNotInTheMonth();
    updateDayBttnsColors();


    function updateGridStart(){
        dayButtons[0].style.gridColumnStart = displayHabitMonth.getFirstDayNumber() + 1; /* 1(Sunday), ... , 7(Saturday) */
    }

    function resetDayBttnsToDefault() {
        dayButtons.forEach(button => {
            button.className = "day-button"
            button.disabled = false;
        });
    }

    function hideDaysNotInTheMonth() {
        // ex: february only has 28 days. So day 29, 30 and 31 should not display.
        for (let i = 31; i > displayHabitMonth.getNumberOfDays(); i--) {
            const button = dayButtons[i - 1];
            button.disabled = true;
        }
    }

    function updateDayBttnsColors() {
        const aux = displayHabitMonth.getDaysArray();
        for (let i = 0; i < aux.length; i++) {
            
            const button = dayButtons[i]
            updateDayBttnFontWeight(button)
            updateDisplayBttnState(button)
         

            function updateDayBttnFontWeight(button) {
                
                //if the displaying HabitMonth has already passed for the user (chronologically):
                if ((new Date(getTodayHabitMonthId() + '-1')).getTime() > (new Date(displayHabitMonth.getId() + '-1')).getTime()) {
                    button.className = "day-button day-button-bold-transparent-number";
                }
                //else, if the displaying HabitMonth is the one the user is living at the moment:
                else if (displayHabitMonth.getId() == getTodayHabitMonthId()) {
                    let dayNumberFromTheBttn = button.innerText
                    if (dayNumberFromTheBttn < getTodayDay()) {
                        button.className = "day-button day-button-bold-transparent-number";
                    }
                    else if (dayNumberFromTheBttn == getTodayDay()) {
                        button.className = "day-button day-button-bolder-number";
                    }
                }
            }

            function updateDisplayBttnState(dayButton){
                if ((aux[i] == 1))
                    dayButton.classList.add('day-button-success-state');
                else if (aux[i] == -1) 
                    dayButton.classList.add('day-button-failure-state');
            }
        }
    }
}
