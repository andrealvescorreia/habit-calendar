export function getTodayDate(){
    return new Date()
}
export function getTodayDay(){
    return getTodayDate().getDate()
}
export function isToday(day){
    return (day == getTodayDay())
}