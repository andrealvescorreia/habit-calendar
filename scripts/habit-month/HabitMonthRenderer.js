import {txtHabitMonthName, 
        txtSuccessPercentage, 
        dayButtons} from '../utils/DOMelements.js';

import {getTodayDay,  
        getTodayHabitMonthId} from '../utils/dateUtils.js';
import { HabitMonth } from './HabitMonth.js';


export function createHabitMonthRenderer(){

    function update(displayHabitMonth) {
        updateSuccessPercentageDisplay()
        updateDayButtonsDisplay()
        updateHabitMonthNameDisplay()

        
        function updateHabitMonthNameDisplay(){
            txtHabitMonthName.innerText = displayHabitMonth.getName() + ' ' + displayHabitMonth.getYear()
        }
        
        
        function updateSuccessPercentageDisplay(){
            let previousPercentage = parseInt(txtSuccessPercentage.innerText)
            if(isNaN(previousPercentage)){
                animateValue(txtSuccessPercentage, 0, displayHabitMonth.getSuccessPercentage(), 1)
                return
            }
            animateValue(txtSuccessPercentage, previousPercentage, displayHabitMonth.getSuccessPercentage(), 600)
            
            function animateValue(obj, start, end, duration) {
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
                // ex: february only has 28 days. So day 29, 30 and 31 should not display.
                for (let i = 31; i > displayHabitMonth.getNumberOfDays(); i--) {
                    const button = dayButtons[i - 1];
                    button.disabled = true;
                }
            }
        
            function updateDayBttnsStyle() {
                const aux = displayHabitMonth.getDaysArray();
                for (let i = 0; i < aux.length; i++) {
                    
                    const button = dayButtons[i]
                    updateDayBttnFontWeight(button)
                    updateDisplayBttnState(button)
                 
        
                    function updateDayBttnFontWeight(button) {
                        
                        if(monthAlreadyPassed()) {
                            button.className = "day-button day-button-past";
                        }
                        else if (isCurrentMonth()) {
                            let dayNumberFromTheBttn = button.innerText
                            if (dayNumberFromTheBttn < getTodayDay()) {
                                button.className = "day-button day-button-past";
                            }
                            else if (dayNumberFromTheBttn == getTodayDay()) {
                                button.className = "day-button day-button-today";
                            }
                        }
        
                        function monthAlreadyPassed(){
                            return (new Date(getTodayHabitMonthId() + '-1')).getTime() > (new Date(displayHabitMonth.getId() + '-1')).getTime()
                        }
                        function isCurrentMonth(){
                            return displayHabitMonth.getId() == getTodayHabitMonthId()
                        }
        
                    }
        
                    function updateDisplayBttnState(dayButton){
                        function removeStates(){
                            dayButton.classList.remove('failure-state');
                            dayButton.classList.remove('success-state');
                        }
                        removeStates()
                        if ((aux[i] == HabitMonth.DAY_STATES.SUCCESS)){
                            dayButton.classList.add('success-state');
                            return
                        }
                        if (aux[i] == HabitMonth.DAY_STATES.FAILURE) {
                            dayButton.classList.add('failure-state');
                            return
                        }
                    }
                }
            }
        }


    }
    
    
    

    return {
        update
    }
}
