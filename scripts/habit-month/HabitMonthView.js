// this script is responsible for showing the habit calendar on the web page.
// __________________________________________________________________


import {txtHabitMonthName, 
        txtSuccessPercentage, 
        dayButtons} from '../utils/DOMelements.js';

import { dayHasPassed, isToday } from '../utils/dateUtils.js';
import { HabitMonth } from './HabitMonth.js';
import { playDayStateAnimation } from './animations.js';

export function createHabitMonthView(){
    var previousDisplayHabitMonth
    var displayHabitMonth

    function update(habitMonth) {
        displayHabitMonth = habitMonth.clone()

        if(previousDisplayHabitMonth == undefined || previousAndCurrentAreDifferent()){
            updateEverything()
        }
        else {
            detectDaysChangedInSameHabitMonth().forEach((dayIndex)=>{
                changeDayButtonStateStyle(dayButtons[dayIndex], habitMonth.getDayAt(dayIndex))
                playDayStateAnimation(dayButtons[dayIndex])
            })
        }
        updateSuccessPercentageDisplay()
        previousDisplayHabitMonth = habitMonth.clone()
    }
    return {
        update
    }

    function previousAndCurrentAreDifferent(){
        return displayHabitMonth.getId() != previousDisplayHabitMonth.getId()
    }

    function removeAnyStateStyle(dayButton){
        dayButton.classList.remove('failure-state');
        dayButton.classList.remove('success-state');
    }

    function updateDayBttnFontWeight(dayButton) {
        if(displayHabitMonth.alreadyPassed()) {
            dayButton.className = "day-button day-button-past";
            return
        }
        if(displayHabitMonth.isCurrentMonth()) {
            let buttonDay = parseInt(dayButton.innerText)
            if (dayHasPassed(buttonDay)) {
                dayButton.className = "day-button day-button-past";
                return
            }
            if (isToday(buttonDay)) {
                dayButton.className = "day-button day-button-today";
                return
            }
        }
    }

    function changeDayButtonStateStyle(dayButton, dayState){
        removeAnyStateStyle(dayButton)
        if (dayState == HabitMonth.DAY_STATES.SUCCESS) {
            dayButton.classList.add('success-state');
            return
        }
        if (dayState == HabitMonth.DAY_STATES.FAILURE) {
            dayButton.classList.add('failure-state');
            return
        }
    }

    function updateDayButton(dayButton){
        const dayState = displayHabitMonth.getDayAt(parseInt(dayButton.innerText)-1)
        updateDayBttnFontWeight(dayButton)
        changeDayButtonStateStyle(dayButton, dayState)
    }

    function updateEverything(){
        updateHabitMonthNameDisplay()
        updateSuccessPercentageDisplay()
        updateDayButtonsDisplay()
    }

    

    function detectDaysChangedInSameHabitMonth(){
        let daysChanged = []
        if(previousAndCurrentAreDifferent()){
            return daysChanged
        }
        for (let i = 0; i < displayHabitMonth.getQuantityOfDays(); i++) {
            if(displayHabitMonth.getDayAt(i) !== previousDisplayHabitMonth.getDayAt(i)){
                daysChanged.push(i);
            }
        }
        return daysChanged
    }

    function updateHabitMonthNameDisplay(){
        txtHabitMonthName.innerText = displayHabitMonth.getMonthName() + ' ' + displayHabitMonth.getYear()
    }
    
    
    function updateSuccessPercentageDisplay(){
        let previousPercentage = parseInt(txtSuccessPercentage.innerText)
        if(isNaN(previousPercentage)){
            animateTransition(txtSuccessPercentage, 0, displayHabitMonth.getSuccessPercentage(), 1)
            return
        }
        animateTransition(txtSuccessPercentage, previousPercentage, displayHabitMonth.getSuccessPercentage(), 600)
        
        function animateTransition(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerText = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }
    
    
    function updateDayButtonsDisplay(){
        updateGridStart();
        resetDayBttnsToDefault();
        hideDaysNotInTheMonth();
        updateDayBttnsStyle();
    
    
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
            // ex: february only has 28 days. So day 29, 30 and 31 should NOT display.
            for (let i = dayButtons.length; i > displayHabitMonth.getQuantityOfDays(); i--) {
                const button = dayButtons[i - 1];
                button.disabled = true;
            }
        }
        function updateDayBttnsStyle() {
            for (let i = 0; i < displayHabitMonth.getQuantityOfDays(); i++) {
                updateDayButton(dayButtons[i])
            }
        }
    }
}
