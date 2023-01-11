import {getTheme, setTheme} from './themeController.js';

export function switchTheme(){
    document.body.classList.toggle("dark");
    if (themeIsDark()) 
        setTheme("light")
    else 
        setTheme("dark")

    updateTheme()
}

export function updateTheme(){
    if(themeIsDark())
        document.body.classList.toggle("dark", true) 
}

function themeIsDark(){
    return getTheme() === "dark"
}

