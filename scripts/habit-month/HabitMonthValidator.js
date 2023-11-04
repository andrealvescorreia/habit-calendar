import { HabitMonth } from "./HabitMonth.js"

export class HabitMonthValidator {
    static validate({id, daysArray}){
        this.#validateId(id)

        if(daysArray != null && this.#validateDaysArray(daysArray, id) == false)
            throw new Error('array de dias invalido')
    }

    static #validateId(monthId){
        // exemples of valid ids:
        // '0001-01'
        // '2022-09'
        // '9999-12'

        if(typeof monthId != 'string')
            throw new TypeError('must be string')

        const idRegex = "^[0-9]{4}-(0?[1-9]|1[012])$"
        if (!monthId.match(idRegex)) 
            throw new Error('id de formato ivalido')
    }

    static #validateDaysArray(monthDaysArray, monthId){
        if (!Array.isArray(monthDaysArray)) 
            throw new TypeError('must be array')
            
        if (monthDaysArray.length != this.#expectedNumberOfDaysInMonth(monthId)) 
            throw new Error('wrong array size (should be',this.#expectedNumberOfDaysInMonth(monthId),', but received ', monthDaysArray.length,')')

        if(monthDaysArray.every(item => typeof item == 'number') == false)
            throw new TypeError('one of the values is not a number')

        monthDaysArray.forEach(element => {
            if(Object.values(HabitMonth.DAY_STATES).includes(element) == false) 
                throw new Error('invalid value of ', element, ' at indexOf: ',monthDaysArray.indexOf(element))
        })
    }

    static #expectedNumberOfDaysInMonth(id){
        const date = new Date(id + '-01T00:00:01')
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    }
}