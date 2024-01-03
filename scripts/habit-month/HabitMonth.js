import { HabitMonthValidator } from "./HabitMonthValidator.js"

export class HabitMonth {
    #id = ''
    #daysArray = []

    static DAY_STATES = {
        SUCCESS: 1,
        FAILURE: -1,
        NEUTRAL: 0
    }

    static create({id = this.generateTodaysId(), daysArray = this.#defaultDaysArray(id)}){
        HabitMonthValidator.validate({id, daysArray})
        return new HabitMonth(id, daysArray)
    }

    constructor(id, daysArray) {
        this.#id = id;
        this.#daysArray = daysArray;
    }
   
    static generateTodaysId(){
        const todayDate = new Date()
        return String(todayDate.getFullYear()+ '-' + String(todayDate.getMonth() + 1).padStart(2, '0'));
    }

    static #defaultDaysArray(id) { // aux function for the constructor.
        return Array(parseInt(HabitMonth.#expectedNumberOfDaysInMonth(id))).fill(0)
    }

    static #expectedNumberOfDaysInMonth(id) { // aux function for the constructor.
        const date = new Date(id + '-01T00:00:01')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    }

    toDate() {
        return new Date(this.#id + '-01T00:00:01')
    }

    get json(){
        const simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        const jsonData = JSON.stringify(simpleMonth);
        return jsonData
    }

    clone(){
        let simpleHabitMonth = JSON.parse(this.json)
        return HabitMonth.create(simpleHabitMonth)
    }
    getSuccessPercentage(){
        const countOccurrences = (value, array) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);
        const numOfSuccesfulDays = countOccurrences(1, this.#daysArray)
        return parseInt((numOfSuccesfulDays * 100) / this.#daysArray.length)
    }


    
    get quantityOfDays(){
        return this.#daysArray.length
    }
    get id(){
        return this.#id
    }
    
    stateOfDayAt(index){
        return this.#daysArray[index]
    }

    get name(){
        return this.#monthName + ' ' + this.#year
    }

    get #monthName(){
        let monthName = this.toDate().toLocaleString('default', { month: 'long' })
        monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        return monthName;
    }
    get #year(){
        return this.toDate().getFullYear()
    }
    get monthIndex(){//january: 1, december: 12
        return this.toDate().getMonth()+1
    }
    getFirstDayNumber(){// 0 (Sunday), ... , 6 (Saturday)
        return this.toDate().getDay()
    }

    switchDayStateAt(dayIndex){
        if(dayIndex >= this.quantityOfDays || dayIndex < 0) return

        const currentState = this.stateOfDayAt(dayIndex)
        switch(currentState){
            case HabitMonth.DAY_STATES.NEUTRAL:
                this.#changeDayStateToSuccessAt(dayIndex)
                break
            case HabitMonth.DAY_STATES.FAILURE:
                this.#changeDayStateToNeutralAt(dayIndex)
                break
            case HabitMonth.DAY_STATES.SUCCESS:
                this.#changeDayStateToFailureAt(dayIndex)
                break
        }
    }

    #changeDayStateToSuccessAt(dayIndex){
        this.#daysArray[dayIndex] = HabitMonth.DAY_STATES.SUCCESS;  
    }
    #changeDayStateToFailureAt(dayIndex){
        this.#daysArray[dayIndex] = HabitMonth.DAY_STATES.FAILURE;  
    }
    #changeDayStateToNeutralAt(dayIndex){
        this.#daysArray[dayIndex] = HabitMonth.DAY_STATES.NEUTRAL;  
    }


    



   

    generatePreviousHabitMonthId(){
        if(habitMonthIsJanuary(this))
            return this.#year - 1 + '-12'
        return this.#year + '-' + String(this.monthIndex - 1).padStart(2, '0')
    
        function habitMonthIsJanuary(m){
            return m.monthIndex == 1
        }
    }
    
    generateNextHabitMonthId(){
        if(habitMonthIsDecember(this))
            return this.#year + 1 + '-01'
        return this.#year + '-' + String(this.monthIndex + 1).padStart(2, '0')
        
        function habitMonthIsDecember(m){
            return m.monthIndex == 12
        }
    }


    alreadyPassed(){
        return (new Date(HabitMonth.generateTodaysId() + '-1')).getTime() > (new Date(this.id + '-1')).getTime()
    }
    isCurrentMonth(){
        return this.id == HabitMonth.generateTodaysId()
    }

    isSuccessful(dayIndex){
        return this.#daysArray[dayIndex] == HabitMonth.DAY_STATES.SUCCESS
    }
    isFailure(dayIndex){
        return this.#daysArray[dayIndex] == HabitMonth.DAY_STATES.FAILURE
    }
    isNeutral(dayIndex){
        return this.#daysArray[dayIndex] == HabitMonth.DAY_STATES.NEUTRAL
    }



    saveInLocalStorage(){
        localStorage.setItem(this.id, this.json)
    }
    
    static get(id){// returns null if not found it
        let rawHabitMonthData = JSON.parse(localStorage.getItem(id))
        if(rawHabitMonthData == null) return null
        let foundHabitMonth = HabitMonth.create(rawHabitMonthData)
        return foundHabitMonth;
    }
    
    getStreak(pivotDay, habitMonthId = this.id){
        let habitMonthStreak = 0
        const foundHabitMonth = HabitMonth.get(habitMonthId)
    
        if(foundHabitMonth == null) return 0
    
        for (let dayIndex = pivotDay - 1; dayIndex >= 0; dayIndex--) {
            if(foundHabitMonth.isSuccessful(dayIndex))
                habitMonthStreak++
            else 
                return habitMonthStreak
        }
    
        const previousHabitMonthId = foundHabitMonth.generatePreviousHabitMonthId()
        const lastDayOfPreviousMonth = getLastDayOfMonth(previousHabitMonthId)
        
        return habitMonthStreak + this.getStreak(lastDayOfPreviousMonth, previousHabitMonthId)
    
        // aux fun    
        function getLastDayOfMonth(habitMonthId){
            return HabitMonth.create({id: habitMonthId}).quantityOfDays;
        }
    }
}