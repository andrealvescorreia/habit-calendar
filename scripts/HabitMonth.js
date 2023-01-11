//import { createHabitMonthController } from "./HabitMonthController.js"

export class HabitMonth {
    #id 
    #daysArray = []

    // static factory method
    static createHabitMonth(id, daysArray){
        if(this.#isIdValid(id) == false)
            return null
        
        if(daysArray != null && this.#isDaysArrayValid(daysArray, id) == false)
            return null
        
        return new HabitMonth(id, daysArray)
    }


    constructor(id, daysArray = this.#defaultDaysArray(id)) {
        this.#id = id;
        this.#daysArray = daysArray;
    }
    
    #defaultDaysArray(id){ // aux function for the constructor.
        return Array(parseInt(HabitMonth.expectedNumberOfDaysInMonth(id))).fill(0)
    }

    static expectedNumberOfDaysInMonth(id){// aux function for the constructor and daysArray validator
        const date = new Date(id + '-1')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    }

    


    
    
    


    getNumberOfDays(){
        return this.#daysArray.length
    }
    getId(){
        return this.#id
    }
    getDaysArray(){
        return this.#daysArray
    }


    getName(){
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
        if(dayIndex >= this.getNumberOfDays() || dayIndex < 0) return

        const currentState = this.getDaysArray()[dayIndex]
        switch(currentState){
            case 0:
                this.changeDayToFailureState(dayIndex)
                break
            case -1:
                this.changeDayToSuccessState(dayIndex)
                break
            case 1:
                this.changeDayToNeutralState(dayIndex) 
                break
        }
    }

    changeDayToSuccessState(dayIndex){
        if(dayIndex >= this.#daysArray.lenght || dayIndex < 0) return
        this.#daysArray[dayIndex] = 1;  
    }
    changeDayToFailureState(dayIndex){
        if(dayIndex >= this.#daysArray.lenght || dayIndex < 0) return
        this.#daysArray[dayIndex] = -1;  
    }
    changeDayToNeutralState(dayIndex){
        if(dayIndex >= this.#daysArray.lenght || dayIndex < 0) return
        this.#daysArray[dayIndex] = 0;  
    }


    getJson(){
        const simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        const jsonData = JSON.stringify(simpleMonth);
        return jsonData
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
        if(monthDaysArray.length != HabitMonth.expectedNumberOfDaysInMonth(monthId)){ 
            console.log('wrong array size (should be',HabitMonth.expectedNumberOfDaysInMonth(monthId),', but received ', monthDaysArray.length,')')
            return false
        }   
        for (let i = 0; i < monthDaysArray.length; i++) {
            const element = monthDaysArray[i];
            if(element != 0 && element != 1 && element != -1) {
                console.log('invalid value at [',i,']')
                return false
            }
        }
        return true
    }

    stringify(){// use this for debugging only.
        let info = ''
        info += '#id: ' + this.getId() +'\n'+
                'name(): '+ this.getName()+'\n'+
                'firstDay(): '+this.getFirstDayNumber()+'\n'+
                'numOfDays(): '+this.getNumberOfDays()+'\n'+
                '#daysArray: '+this.getDaysArray()
        return info;
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
}

