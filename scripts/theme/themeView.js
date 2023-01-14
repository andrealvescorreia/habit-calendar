import {createThemeController} from './themeController.js';

export function createThemeView(){
    const themeController = createThemeController()
    updateTheme()

    function switchTheme(){
        document.body.classList.toggle("dark");
        if (themeIsDark()) 
            themeController.setTheme("light")
        else 
            themeController.setTheme("dark")
    
        updateTheme()
    }
    
    function updateTheme(){
        if(themeIsDark())
            document.body.classList.toggle("dark", true) 
    }
    
    function themeIsDark(){
        return themeController.getTheme() === "dark"
    }
    
    return {
        switchTheme
    }
}


