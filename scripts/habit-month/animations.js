import { isToday } from "../utils/dateUtils.js"

export function playDayStateAnimation(button){
    removeAnyAnimationClass(button)
    const dayOfTheButton = button.innerText

    if(button.classList.contains('success-state')){
        if(isToday(dayOfTheButton)){
            button.classList.toggle('success-pulse-today')
        }
        else{
            button.classList.toggle('success-pulse')
        }   
    } 
    else if(button.classList.contains('failure-state')){
        button.classList.toggle('transition-to-failure')
    }
    else {
        if(isToday(dayOfTheButton)){
            button.classList.toggle('transition-to-neutral-today')
        }else{
            button.classList.toggle('transition-to-neutral')
        }   
    }

    function removeAnyAnimationClass(button){
        button.classList.remove('success-pulse')
        button.classList.remove('transition-to-failure')
        button.classList.remove('transition-to-neutral')
        button.classList.remove('transition-to-neutral-today')
        button.classList.remove('success-pulse-today')
    }
}