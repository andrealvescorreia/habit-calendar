// this script is responsible for the visual part of the application.



// switch to dark theme if it was the theme the user was using before.
if(window.localStorage.getItem("theme") === "dark"){
    document.body.classList.toggle("dark");
    updateColorsValues()
}


function themeSwitch(){
    document.body.classList.toggle("dark");
    if ( window.localStorage.getItem("theme") === "dark" ) 
        window.localStorage.setItem("theme", "light");
    else 
        window.localStorage.setItem("theme", "dark");
}

// most important function of this script.
function updateDisplay(displayMonth) {
    updateColorsValues()
    updateSvgBttns()
    updateStreakDisplay()
    updateSuccessPercentageDisplay(displayMonth)
    updateDayButtonsDisplay(displayMonth)
    updateMonthNameDisplay(displayMonth)
}


function updateSvgBttns(){
    const currentTheme = window.localStorage.getItem("theme")
    if(currentTheme === "light"){
        document.querySelectorAll('.bttn-svg').forEach(button =>{
            button.style.filter = "none";
        })
    }else if(currentTheme === "dark"){
        document.querySelectorAll('.bttn-svg').forEach(button =>{
            button.style.filter = "invert(100%)";
        })
    }
}


function updateStreakDisplay(){
    streak = calculateStreak(getTodayMonthId(), getTodayDay())
    if(streak <= 1){
        txtStreak.innerText = ''
    }else{
        txtStreak.innerText = String(streak) + ' days Streak'
    }
}


function updateMonthNameDisplay(displayMonth){
    txtMonthName.innerText = displayMonth.getName() + ' ' + displayMonth.getYear()
}


function updateSuccessPercentageDisplay(displayMonth){
    // 'countOccurrences' works as a function.
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    const auxDaysArray = displayMonth.getDaysArray()
    const numOfSuccesfulDays = countOccurrences(auxDaysArray, 1)
    let succesPercentage = (numOfSuccesfulDays * 100) / auxDaysArray.length
    txtSuccessPercentage.innerText = String(parseInt(succesPercentage))
}


function updateDayButtonsDisplay(displayMonth){

    // reseting the values of all 'day' buttons to default:
    let dayCount = 0
    dayButtons.forEach( button =>{
        dayCount++;
        button.innerText= dayCount;
        button.disabled = false
        button.style.position = "static"
        button.style.zIndex = "auto"
        button.style.borderColor = "transparent"
        button.style.fontWeight = "normal"  
        button.style.opacity = "1"
        button.style.color = numberColor  
    })

    dayButtons[0].style.gridColumnStart = displayMonth.getFirstDay() + 1; /* 1(Sunday), ... , 7(Saturday) */

    // updating colors of all the 'day' buttons:
    const aux = displayMonth.getDaysArray()
    for(let i = 0; i < aux.length; i++){
        const button = dayButtons[i]
        button.style.borderStyle = "solid"
        if((aux[i] == 1)){    
            button.style.borderColor = successColor
        } else if(aux[i] == -1){
            button.style.borderColor = failureColor
        }
        else{
            button.style.borderStyle = "none"
        }
        
        //if the displaying month has already passed for the user (chronologically):
        if((new Date(getTodayMonthId()+'-1')).getTime() > (new Date(displayMonth.getId()+'-1')).getTime() ){
            button.style.fontWeight  = "700"
            button.style.color = numberColorTransparent
        }

        //if the displaying month is the one the user is living at the moment:
        else if(displayMonth.getId() == getTodayMonthId()){ 
            if(i < getTodayDay() - 1){
                button.style.fontWeight  = "700"
                button.style.color = numberColorTransparent
            }
            else if(i == getTodayDay() - 1){
                button.style.fontWeight  = "900"
            }   
        }
    }

    // hide the 'day' bttns that are not in the month (ex: february only has 28 days, so day 29, 30 and 31 should be deactivated)
    for (let i = 31; i > displayMonth.getNumOfDays(); i--) {
        const button = dayButtons[i - 1];
        button.innerHTML = ''
        button.style.position = "absolute"
        button.style.zIndex = "-1";
        button.disabled = true;  
    }
}
