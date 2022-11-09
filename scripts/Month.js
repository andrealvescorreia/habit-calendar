
class Month {
    #id 
    #daysArray = []
    // the 'daysArray' stores the succeses (1) and failures (-1) of the habit. 
    // days in wich the user stil hasn't told if he failed or succeeded are represented with 0.

    

    constructor(id, daysArray = this.#createDaysArray(id)) {
        this.#id = id;
        this.#daysArray = daysArray;
    }
    
    #createDaysArray(id){ // aux function for the constructor.
        return Array(parseInt(Month.countDaysInMonth(id))).fill(0)
    }

    static countDaysInMonth(id){// aux function for the constructor and daysArray validator
        const date = new Date(id + '-1')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    }

    static validateId(monthId){// aux function of the factory method
        // exemples of valid ids:
        // '2020-01'
        // '2022-10'
        // '2029-12'
            
        if (!(typeof monthId === 'string' || monthId instanceof String)) {
            console.log('not a string')
            return false
            
        }
        if(monthId.length != 7){
            console.log('wrong lenght')
            return false
        }
        if(monthId.charAt(4) != '-') {
            console.log('missing "-"')
            return false
        }
        const yearPart = monthId.slice(0, 4)
        const monthPart = monthId.slice(5)
        if( !(yearPart.match("^[0-9]{4}")) ){
            console.log('invalid year')
            return false
        }
        if( !(parseInt(monthPart) > 0 && parseInt(monthPart) < 13) ){ 
            console.log('invalid month')
            return false
        }
        
        return true
    }

    static validateDaysArray(monthDaysArray, monthId){
        if(!Array.isArray(monthDaysArray)) {
            console.log('not an array')
            return false
        }
        if(monthDaysArray.length != Month.countDaysInMonth(monthId)){ 
            console.log('wrong array size (should be',Month.countDaysInMonth(monthId),', but received ', monthDaysArray.length,')')
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


    // static factory method
    static createMonth(id, daysArray){
        if(!this.validateId(id)){
            return null
        }
        if(daysArray != null && !this.validateDaysArray(daysArray, id)){
            return null
        }
        return new Month(id, daysArray)
    }

    
    


    getNumOfDays(){
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
    getFirstDay(){// 0 (Sunday), ... , 6 (Saturday)
        const date = new Date(this.#id + '-1')
        return date.getDay()
    }

    switchDayState(dayIndex){
        if(dayIndex >= this.getNumOfDays() || dayIndex < 0) return

        const currentState = this.getDaysArray()[dayIndex]
        switch(currentState){
            case 0:
                // switch to failure state.
                this.changeDaysArray(dayIndex, -1)
                break
            case -1:
                // switch to success state. 
                this.changeDaysArray(dayIndex, 1)
                break
            case 1:
                // switch back to neutral state.
                this.changeDaysArray(dayIndex, 0) 
                break
        }
    }

    changeDaysArray(dayIndex, newValue){
        if(newValue != 0 && newValue != 1 && newValue != -1){return}
        if(dayIndex >= this.#daysArray.lenght){return}
        
        this.#daysArray[dayIndex] = newValue;   
    }

    getJson(){
        const simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        const jsonData = JSON.stringify(simpleMonth);
        return jsonData
    }



    stringify(){// use this for debugging only.
        let info = ''
        info += '#id: ' + this.getId() +'\n'+
                'name(): '+ this.getName()+'\n'+
                'firstDay(): '+this.getFirstDay()+'\n'+
                'numOfDays(): '+this.getNumOfDays()+'\n'+
                '#daysArray: '+this.getDaysArray()
        return info;
    }
}

