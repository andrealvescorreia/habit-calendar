import {txtStreak} from '../utils/DOMelements.js';

import {getTodayDay} from '../utils/dateUtils.js';

import { createHabitMonthController } from './HabitMonthController.js';
import { HabitMonth } from './HabitMonth.js';

export function createHabitMonthStreakRenderer(){
    var displayHabitMonth;
    const habitMonthController = createHabitMonthController();

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
            let todayHabitMonth = HabitMonth.create({})
            return displayHabitMonth.getId() != todayHabitMonth.getId()
        }
        function todayIsInNeutralState(){
            return displayHabitMonth.getDayAt(getTodayDay() - 1) == 0
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