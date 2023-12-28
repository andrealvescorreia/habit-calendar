import {txtStreak} from '../utils/DOMelements.js';

import {getTodayDay} from '../utils/dateUtils.js';

import { HabitMonth } from './HabitMonth.js';

export function createHabitMonthStreakView(){
    var displayHabitMonth;

    function update(habitMonth){

        displayHabitMonth = habitMonth
     
        if(isNotCurrentMonth()) {
            txtStreak.classList.add('invisible')
            return
        }
    
        let streak = 0
        if(todayIsInNeutralState())
            streak = calculateStreakFromYesterday()
        else
            streak = calculateStreakFromToday()
    
        if(streak <= 1){
            txtStreak.classList.add('invisible')
        }
        else{
            txtStreak.classList.remove('invisible')
            txtStreak.innerText =  String(streak) + ' days Streak'
        }
    
        
        function isNotCurrentMonth(){
            return displayHabitMonth.id != HabitMonth.generateTodaysId()
        }
        function todayIsInNeutralState(){
            return displayHabitMonth.stateOfDayAt(getTodayDay() - 1) == 0
        }
        
        function calculateStreakFromToday(){
            return habitMonth.getStreak(getTodayDay())
        }
        function calculateStreakFromYesterday(){
            return habitMonth.getStreak(getTodayDay() - 1)
        }
    }
    return {
        update
    }
}