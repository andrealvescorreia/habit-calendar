export function createThemeController(){
    
    function getTheme(){
        return window.localStorage.getItem("theme")
    }
    function setTheme(theme){
        window.localStorage.setItem("theme", theme)
    }
    return{
        getTheme,
        setTheme
    }
}

