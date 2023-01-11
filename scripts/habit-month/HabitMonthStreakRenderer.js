import {txtStreak} from '../utils/DOMelements.js';

import {getTodayDay,  
    getTodayHabitMonthId} from '../utils/dateUtils.js';

import { createHabitMonthController } from './HabitMonthController.js';

export function createHabitMonthStreakRenderer(){
    const habitMonthController = createHabitMonthController();
    function update(displayHabitMonth){
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
            return habitMonthController.getStreak(displayHabitMonth.getId(), getTodayDay())
        }
        function calculateStreakFromYesterday(){
            return habitMonthController.getStreak(displayHabitMonth.getId(), getTodayDay() - 1)
        }
    }
    return {
        update
    }
}