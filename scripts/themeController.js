export function getTheme(){
    return window.localStorage.getItem("theme")
}
export function setTheme(theme){
    window.localStorage.setItem("theme", theme)
}