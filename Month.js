// exemples of valid ids:
// '2020-01'
// '2022-10'
// '2029-12'
class Month {

    #id 
    #daysArray = []
    // the 'daysArray' stores the succeses (1) and failures (-1) of the user' habit. 
    // days in wich the user stil hasn't told if he failed or succeeded are represented with 0.

    // to-do: validate if the id ('year-month') the user gave is valid.
    constructor(id, daysArray = this.#createDaysArray(id)) {
        this.#id = id;
        this.#daysArray = daysArray;
    }

    #createDaysArray(id){ // aux function for the constructor.
        return Array(parseInt(this.#countDaysInMonth(id))).fill(0)
    }
    #countDaysInMonth(id){// aux function for the constructor.
        const date = new Date(id + '-1')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
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
        return date.toLocaleString('default', { month: 'long' });
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

