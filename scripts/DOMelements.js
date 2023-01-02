// BUTTONS:
export const dayButtons                = document.querySelectorAll('.day-button');
export const bttnHabitMonthSwitcherPrevious = document.getElementById('month-switcher-left');
export const bttnHabitMonthSwitcherNext     = document.getElementById('month-switcher-right');
export const bttnTrashCan              = document.getElementById('trash-bttn')
export const bttnDarkModeToggle        = document.getElementById('dark-mode-toggle');

// COLORS:
export var successColor
export var failureColor
export var numberColor
export var numberColorTransparent
updateColorsValues()

// TEXT ELEMENTS:
export const txtSuccessPercentage  = document.getElementById('success-percentage-number')
export const txtHabitMonthName = document.getElementById('month-name')
export const txtStreak = document.getElementById('streak')


export function updateColorsValues(){
    successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
    failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
    numberColor  = String(getComputedStyle(document.body).getPropertyValue('--number-color'));
    numberColorTransparent = String(getComputedStyle(document.body).getPropertyValue('--number-color-transparent'));
}
