// this script is responsible for showing the habit calendar on the web page.
// __________________________________________________________________


import {
    txtHabitMonthName,
    txtSuccessPercentage,
    dayButtons
} from '../utils/DOMelements.js';

import { dayHasPassed, isToday } from '../utils/dateUtils.js';
import { HabitMonth } from './HabitMonth.js';
import { playDayStateAnimation } from './animations.js';

import {
    DAY_BTTN_STATES_CLASSNAME,
    DAY_BTTN_CLASSNAME
} from '../utils/classNames.js';

export function createHabitMonthView() {
    var previousDisplayedHabitMonth
    var currentDisplayingHabitMonth





    return {
        update(habitMonth) {
            currentDisplayingHabitMonth = habitMonth.clone()

            if (previousDisplayedHabitMonth == undefined || previousAndCurrentAreDifferent()) {
                updateEverything()
            }
            else {
                detectDaysChangedInSameHabitMonth().forEach((dayIndex) => {
                    changeDayButtonStateStyle(dayButtons[dayIndex], habitMonth.stateOfDayAt(dayIndex))
                    playDayStateAnimation(dayButtons[dayIndex])
                })
            }
            updateSuccessPercentageDisplay()
            previousDisplayedHabitMonth = currentDisplayingHabitMonth.clone()
        }
    }

    function previousAndCurrentAreDifferent() {
        return currentDisplayingHabitMonth.id != previousDisplayedHabitMonth.id
    }

    function removeAnyStateStyle(dayButtonEl) {
        DAY_BTTN_STATES_CLASSNAME

        dayButtonEl.classList.remove(DAY_BTTN_STATES_CLASSNAME.FAILURE);
        dayButtonEl.classList.remove(DAY_BTTN_STATES_CLASSNAME.SUCCESS);
    }

    function updateDayBttnFontWeight(dayButtonEl) {
        if (currentDisplayingHabitMonth.hasAlreadyPassed()) {
            dayButtonEl.className = "day-button day-button-past";
        }
        else if (currentDisplayingHabitMonth.isCurrentMonth()) {
            let dayOfButton = parseInt(dayButtonEl.innerText)
            if (dayHasPassed(dayOfButton)) {
                dayButtonEl.className = "day-button day-button-past";
            }
            else if (isToday(dayOfButton)) {
                dayButtonEl.className = "day-button day-button-today";
            }
        }
    }

    function changeDayButtonStateStyle(dayButtonEl, newState) {
        removeAnyStateStyle(dayButtonEl)
        if (newState == HabitMonth.DAY_STATES.SUCCESS) {
            dayButtonEl.classList.add(DAY_BTTN_STATES_CLASSNAME.SUCCESS);
        }
        else if (newState == HabitMonth.DAY_STATES.FAILURE) {
            dayButtonEl.classList.add(DAY_BTTN_STATES_CLASSNAME.FAILURE);
        }
    }

    function updateDayButton(dayButtonEl) {
        const dayState = currentDisplayingHabitMonth.stateOfDayAt(parseInt(dayButtonEl.innerText) - 1)
        updateDayBttnFontWeight(dayButtonEl)
        changeDayButtonStateStyle(dayButtonEl, dayState)
    }

    function updateEverything() {
        updateHabitMonthNameDisplay()
        updateSuccessPercentageDisplay()
        updateDayButtonsDisplay()
    }



    function detectDaysChangedInSameHabitMonth() {
        let daysChanged = []
        const dayStateHasChanged = (index) => {
            return (
                currentDisplayingHabitMonth.stateOfDayAt(index)
                !==
                previousDisplayedHabitMonth.stateOfDayAt(index)
            )
        }

        if (previousAndCurrentAreDifferent()) {
            return [];
        }
        for (let index = 0; index < currentDisplayingHabitMonth.quantityOfDays; index++) {
            if (dayStateHasChanged(index))
                daysChanged.push(index);

        }
        return daysChanged;
    }

    function updateHabitMonthNameDisplay() {
        txtHabitMonthName.innerText = currentDisplayingHabitMonth.name
    }


    function updateSuccessPercentageDisplay() {
        let previousPercentage = parseInt(txtSuccessPercentage.innerText)
        if (isNaN(previousPercentage)) {
            animateTransition(txtSuccessPercentage, 0, currentDisplayingHabitMonth.getSuccessPercentage(), 1)
            return
        }
        animateTransition(txtSuccessPercentage, previousPercentage, currentDisplayingHabitMonth.getSuccessPercentage(), 600)

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


    function updateDayButtonsDisplay() {
        updateGridStart();
        resetDayBttnsToDefault();
        hideDaysNotInTheMonth();
        updateDayBttnsStyle();


        function updateGridStart() {
            dayButtons[0].style.gridColumnStart = currentDisplayingHabitMonth.getFirstDayNumber() + 1; /* 1(Sunday), ... , 7(Saturday) */
        }
        function resetDayBttnsToDefault() {
            dayButtons.forEach(button => {
                button.className = DAY_BTTN_CLASSNAME;
                button.disabled = false;
            });
        }
        function hideDaysNotInTheMonth() {
            // ex: february only has 28 days. So day 29, 30 and 31 should NOT display.
            for (let i = dayButtons.length; i > currentDisplayingHabitMonth.quantityOfDays; i--) {
                const button = dayButtons[i - 1];
                button.disabled = true;
            }
        }
        function updateDayBttnsStyle() {
            dayButtons.forEach(bttn => {
                updateDayButton(bttn)
            })
        }
    }
}
