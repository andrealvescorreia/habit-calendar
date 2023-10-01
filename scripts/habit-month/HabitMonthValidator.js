import { HabitMonth } from "./HabitMonth.js"

export class HabitMonthValidator {
    static validate({id, daysArray}){
        if(id != null && this.#isIdValid(id) == false)
            return null

        if(daysArray != null && this.#isDaysArrayValid(daysArray, id) == false)
            return null
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
        if (!Array.isArray(monthDaysArray)) {
            console.log('not an array')
            return false
        }
        if (monthDaysArray.length != this.#expectedNumberOfDaysInMonth(monthId)) { 
            console.log('wrong array size (should be',this.#expectedNumberOfDaysInMonth(monthId),', but received ', monthDaysArray.length,')')
            return false
        }

        if(monthDaysArray.every(item => typeof item == 'number') == false){
            console.log('one of the values is not a number')
        }

        monthDaysArray.forEach(element => {
            if(Object.values(HabitMonth.DAY_STATES).includes(element) == false) {
                console.log('invalid value of ', element, ' at indexOf: ',monthDaysArray.indexOf(element))
                return false
            }
        })
        return true
    }

    static #expectedNumberOfDaysInMonth(id){
        const date = new Date(id + '-01T00:00:01')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    }
}