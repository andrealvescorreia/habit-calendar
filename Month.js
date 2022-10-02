class Month {

    #id 
    #daysArray

    // to-do: validate if the year-month the user gave is valid.
    constructor(id, daysArray = this.#createDaysArray(id)) {
        this.#id = id;
        this.#daysArray = daysArray;
    }

    #createDaysArray(id){//aux function
        return Array(parseInt(this.#countDaysInMonth(id))).fill(0)
    }
    #countDaysInMonth(id) {//aux function
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
    getFirstDay(){// 0 (Sunday), ... , 6 (Saturday)
        const date = new Date(this.#id + '-1')
        return date.getDay()
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


    getJson(){
        const simpleMonth = {
            id: this.#id,
            daysArray: this.#daysArray
        }
        const jsonData = JSON.stringify(simpleMonth);
        return jsonData
    }
    
    changeDaysArray(dayIndex, newValue){
        if(newValue != 0 && newValue != 1 && newValue != -1){return}
        if(dayIndex >= this.#daysArray.lenght){return}
        
        this.#daysArray[dayIndex] = newValue;   
    }
}

