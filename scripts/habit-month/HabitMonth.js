export class HabitMonth {
    #id = ''
    #daysArray = []

    static DAY_STATES = {
        SUCCESS: 1,
        FAILURE: -1,
        NEUTRAL: 0
    }

    static createHabitMonth(id, daysArray){
        if(id != null && this.#isIdValid(id) == false)
            return null
        
        if(daysArray != null && this.#isDaysArrayValid(daysArray, id) == false)
            return null
        
        return new HabitMonth(id, daysArray)
    }

    stringify(){// use this for debugging only.
        let info = ''
        info += '#id: ' + this.getId() +'\n'+
                'name(): '+ this.getMonthName()+'\n'+
                'firstDay(): '+this.getFirstDayNumber()+'\n'+
                'numOfDays(): '+this.getQuantityOfDays()+'\n'+
                '#daysArray: '+this.#daysArray
        return info;
    }

    constructor(id = this.#defaultId(), daysArray = this.#defaultDaysArray(id)) {
        this.#id = id;
        this.#daysArray = daysArray;
    }
    
    #defaultId(){
        const todayDate = new Date()
        return String(todayDate.getFullYear()+ '-' + String(todayDate.getMonth() + 1).padStart(2, '0'));
    }

    #defaultDaysArray(id){ // aux function for the constructor.
        return Array(parseInt(HabitMonth.#expectedNumberOfDaysInMonth(id))).fill(0)
    }

    static #expectedNumberOfDaysInMonth(id){// aux function for the constructor and daysArray validator
        const date = new Date(id + '-1')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    }



    getJson(){
        const simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        const jsonData = JSON.stringify(simpleMonth);
        return jsonData
    }

    clone(){
        let simpleHabitMonth = JSON.parse(this.getJson())
        return HabitMonth.createHabitMonth(simpleHabitMonth.id, simpleHabitMonth.daysArray)
    }
    getSuccessPercentage(){
        const countOccurrences = (value, array) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);
        const numOfSuccesfulDays = countOccurrences(1, this.#daysArray)
        return parseInt((numOfSuccesfulDays * 100) / this.#daysArray.length)
    }


    
    getQuantityOfDays(){
        return this.#daysArray.length
    }
    getId(){
        return this.#id
    }
    
    getDayAt(index){
        return this.#daysArray[index]
    }


    getMonthName(){
        const date = new Date(this.#id + '-1')
        let monthName = date.toLocaleString('default', { month: 'long' })
        monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        return monthName;
    }
    getYear(){
        const date = new Date(this.#id + '-1')
        return date.getFullYear()
    }
    getNumber(){//january: 1, december: 12
        const date = new Date(this.#id + '-1')
        return date.getMonth()+1
    }
    getFirstDayNumber(){// 0 (Sunday), ... , 6 (Saturday)
        const date = new Date(this.#id + '-1')
        return date.getDay()
    }

    switchDayState(dayIndex){
        if(dayIndex >= this.getQuantityOfDays() || dayIndex < 0) return

        const currentState = this.getDayAt(dayIndex)
        switch(currentState){
            case HabitMonth.DAY_STATES.NEUTRAL:
                this.changeDayToSuccessState(dayIndex)
                break
            case HabitMonth.DAY_STATES.FAILURE:
                this.changeDayToNeutralState(dayIndex)
                break
            case HabitMonth.DAY_STATES.SUCCESS:
                this.changeDayToFailureState(dayIndex)
                break
        }
    }

    changeDayToSuccessState(dayIndex){
        if(dayIndex >= this.#daysArray.lenght || dayIndex < 0) return
        this.#daysArray[dayIndex] = HabitMonth.DAY_STATES.SUCCESS;  
    }
    changeDayToFailureState(dayIndex){
        if(dayIndex >= this.#daysArray.lenght || dayIndex < 0) return
        this.#daysArray[dayIndex] = HabitMonth.DAY_STATES.FAILURE;  
    }
    changeDayToNeutralState(dayIndex){
        if(dayIndex >= this.#daysArray.lenght || dayIndex < 0) return
        this.#daysArray[dayIndex] = HabitMonth.DAY_STATES.NEUTRAL;  
    }


    



    static #isIdValid(monthId){
        // exemples of valid ids:
        // '0001-01'
        // '2022-09'
        // '9999-12'
        const idRegex = "^[0-9]{4}-(0?[1-9]|1[012])$"

        function isString(value){
            return (typeof value === 'string' || value instanceof String)
        }
        if (isString(monthId) == false) {
            console.log('not a string')
            return false
        }
        return (monthId.match(idRegex))
    }

    static #isDaysArrayValid(monthDaysArray, monthId){
        if(!Array.isArray(monthDaysArray)) {
            console.log('not an array')
            return false
        }
        if(monthDaysArray.length != HabitMonth.#expectedNumberOfDaysInMonth(monthId)){ 
            console.log('wrong array size (should be',HabitMonth.#expectedNumberOfDaysInMonth(monthId),', but received ', monthDaysArray.length,')')
            return false
        }   
        for (let i = 0; i < monthDaysArray.length; i++) {
            const element = monthDaysArray[i];
            if(!(Object.values(this.DAY_STATES).includes(element))) {
                console.log('invalid value at [',i,']')
                return false
            }
        }
        return true
    }

    generatePreviousHabitMonthId(){
        if(habitMonthIsJanuary(this))
            return this.getYear() - 1 + '-12'
        return this.getYear() + '-' + String(this.getNumber() - 1).padStart(2, '0')
    
        function habitMonthIsJanuary(m){
            return m.getNumber() == 1
        }
    }
    
    generateNextHabitMonthId(){
        if(habitMonthIsDecember(this))
            return this.getYear() + 1 + '-01'
        return this.getYear() + '-' + String(this.getNumber() + 1).padStart(2, '0')
        
        function habitMonthIsDecember(m){
            return m.getNumber() == 12
        }
    }


    alreadyPassed(){
        let todayHabitMonth = HabitMonth.createHabitMonth();
        return (new Date(todayHabitMonth.getId() + '-1')).getTime() > (new Date(this.getId() + '-1')).getTime()
    }
    isCurrentMonth(){
        let todayHabitMonth = HabitMonth.createHabitMonth()
        return this.getId() == todayHabitMonth.getId()
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
}

