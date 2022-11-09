// BUTTONS:
const dayButtons                = document.querySelectorAll('.day-button');
const bttnMonthSwitcherPrevious = document.getElementById('month-switcher-left');
const bttnMonthSwitcherNext     = document.getElementById('month-switcher-right');
const bttnTrashCan              = document.getElementById('trash-bttn')
const bttnDarkModeToggle        = document.getElementById('dark-mode-toggle');

// COLORS:
var successColor
var failureColor
var numberColor
var numberColorTransparent
updateColorsValues()

// TEXT ELEMENTS:
const txtStreak = document.getElementById('streak')
const txtSuccessPercentage  = document.getElementById('success-percentage-number')

function updateColorsValues(){
    successColor = String(getComputedStyle(document.body).getPropertyValue('--success-color'));
    failureColor = String(getComputedStyle(document.body).getPropertyValue('--failure-color'));
    numberColor  = String(getComputedStyle(document.body).getPropertyValue('--number-color'));
    numberColorTransparent = String(getComputedStyle(document.body).getPropertyValue('--number-color-transparent'));
}
