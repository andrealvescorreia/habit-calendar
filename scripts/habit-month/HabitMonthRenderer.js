

import {txtStreak, 
        txtHabitMonthName, 
        txtSuccessPercentage, 
        dayButtons} from '../utils/DOMelements.js';

import {getTodayDay,  
        getTodayHabitMonthId} from '../utils/dateUtils.js';


export function createHabitMonthRenderer(){

    function update(displayHabitMonth) {
        //updateStreakDisplay()
        updateSuccessPercentageDisplay()
        updateDayButtonsDisplay()
        updateHabitMonthNameDisplay()


        
        function updateStreakDisplay(){
            if(isNotCurrentMonth()) {
                txtStreak.innerText = ''
                return
            }
        
            let streak = 0
            if(todayIsInNeutralState())
                streak = calculateStreakFromYesterday()
            else
                streak = calculateStreakFromToday()
        
            if(streak <= 1)
                txtStreak.innerText = ''
            else
                txtStreak.innerText = String(streak) + ' days Streak'
            
        
            
            function isNotCurrentMonth(){
                return displayHabitMonth.getId() != getTodayHabitMonthId()
            }
            function todayIsInNeutralState(){
                return displayHabitMonth.getDaysArray()[getTodayDay() - 1] == 0
            }
            
            function calculateStreakFromToday(){
                return displayHabitMonth.streak(getTodayDay())
            }
            function calculateStreakFromYesterday(){
                return displayHabitMonth.streak(getTodayDay() - 1)
                
            }
        }
        
        
        function updateHabitMonthNameDisplay(){
            txtHabitMonthName.innerText = displayHabitMonth.getName() + ' ' + displayHabitMonth.getYear()
        }
        
        
        function updateSuccessPercentageDisplay(){
            // 'countOccurrences' works as a function.
            const countOccurrences = (value, array) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);
            
            const auxDaysArray = displayHabitMonth.getDaysArray()
            const numOfSuccesfulDays = countOccurrences(1, auxDaysArray)
            let intSuccesPercentage = parseInt((numOfSuccesfulDays * 100) / auxDaysArray.length)
            txtSuccessPercentage.innerText = String(intSuccesPercentage)
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
                            button.className = "day-button day-button-bold-transparent-number";
                        }
                        else if (isCurrentMonth()) {
                            let dayNumberFromTheBttn = button.innerText
                            if (dayNumberFromTheBttn < getTodayDay()) {
                                button.className = "day-button day-button-bold-transparent-number";
                            }
                            else if (dayNumberFromTheBttn == getTodayDay()) {
                                button.className = "day-button day-button-bolder-number";
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
                        if ((aux[i] == 1))
                            dayButton.classList.add('day-button-success-state');
                        else if (aux[i] == -1) 
                            dayButton.classList.add('day-button-failure-state');
                    }
                }
            }
        }


    }
    
    
    

    return {
        update
    }
}
