

export function createThemeController(){

    updateTheme()

    function switchTheme(){
        document.body.classList.toggle("dark");
        if (themeIsDark()) 
            set("light")
        else 
            set("dark")
    
        updateTheme()
    }
    
    function updateTheme(){
        if(themeIsDark())
            document.body.classList.toggle("dark", true) 
    }
    
    function themeIsDark(){
        return get() === "dark"
    }
    
    function set(theme){
        window.localStorage.setItem("theme", theme)
    }
    function get(){
        return window.localStorage.getItem("theme")
    }

    return {
        switchTheme
    }
}


