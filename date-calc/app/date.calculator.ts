'use strict'
import events = require('events');

class dateCalculator {
    private monthsWith31: number[] = [1, 3, 5, 7, 8, 10, 12];
    private monthsWith30: number[] = [4, 6, 9, 11];
    private monthsWith28: number[] = [2];
    private firstDate: any;
    private secondDate: any;
    private firstDay: number;
    private firstMonth: number;
    private firstYear: number;
    private secondDay: number;
    private secondMonth: number;
    private secondYear: number;

    private currDay: number;
    private currMonth: number;
    private currYear: number;


    // this is the main public function which is called 
    // to calculate the days between two days
    calc = async (firstDate, secondDate): Promise<number> => {

        this.firstDate = firstDate;
        this.secondDate = secondDate;
        // first validate the dates and swap them if they are passed in a wrong order
        this.validateDates();
        // calculate days diff for years diferrece
        let daysDiffInYears = this.calcYearDiffInDays();

        let daysDiff = this.calcDaysDiff();

        let result = daysDiff + daysDiffInYears;
        // the result might be a negative if the first date and second date are the same so make sure you
        // return 0 in this case
        if (result < 0) {
            result = 0;
        }
        //console.log('daysDiffInYears ', daysDiffInYears, 'daysDiff ' , daysDiff, 'total ', result )

  //      this.emit('result', result);
        
        return Promise.resolve(result);
    }

    // ****** to gain a better performance, Instead of just doing a simple loop from first date to second date
    // ****** I decided to first calculate the diff between yesrs and then get into more precise diff
    private calcYearDiffInDays = (): number => {
        let firstYear = this.firstYear;
        let secondYear = this.secondYear;

        if (firstYear === secondYear)
            return 0;

        if (this.firstMonth > this.secondMonth) {
            // the years are diferrent but the first month is grater than 
            //the second month so do count the first year as a full year
            firstYear++;
        }
        else if (this.firstMonth == this.secondMonth && this.firstDay > this.secondDay) {
            // the first and second months are the same and the first day is greater than
            // the second year so don't count the first year as a full year
            firstYear++;
        }

        let days = 0;

        for (let year = firstYear; year < secondYear; year++) {
            if (this.isLeapYear(year)) {
                days += 366;
            }
            else
                days += 365;
        }

        return days;
    }

    // this counts the days from begining to the end and move the current date forward until
    // it gets to the final day and returns the number of days counted
    private calcDaysDiff = (): number => {

        let daysDiff: number = 0;

        this.currDay = this.firstDay;
        this.currMonth = this.firstMonth;
        this.currYear = this.secondYear;

        // check if the first and second dates are the same
        if (this.isSecondDateMet()) {
            return daysDiff - 1;
        }

        // we are at the begining of the process to count days, so we have to be careful about
        // the partial dates (first day and last day), so before counting we move the current day/month
        // forward        
        this.moveCurrentDateForward();
        if (this.isSecondDateMet()) {
            return daysDiff - 1;
        }

        do {
            daysDiff++;

            //console.log(daysDiff);

            this.moveCurrentDateForward();
        }
        while (!this.isSecondDateMet() && daysDiff < 370000)
        return daysDiff;
    }

    // this is responsible to move the current date (day/month) forward considering the number of days in a month
    private moveCurrentDateForward = () => {
        let numberOfDaysInCurrentMonth = 0;
        if (this.monthsWith31.indexOf(this.currMonth) > -1) {
            numberOfDaysInCurrentMonth = 31;
        }
        else if (this.monthsWith30.indexOf(this.currMonth) > -1) {
            numberOfDaysInCurrentMonth = 30;
        }
        else if (this.monthsWith28.indexOf(this.currMonth) > -1) {
            // see if the current year (second year) is a leap year or not
            if (this.isLeapYear(this.currYear)) {
                numberOfDaysInCurrentMonth = 29;
            }
            else {
                numberOfDaysInCurrentMonth = 28;
            }
        }
        if (numberOfDaysInCurrentMonth === 0) {
            throw 'an error in calculation of numberOfDaysInCurrentMonth has occured <<current month>> ' + this.currMonth;
        }

        if (this.currDay < numberOfDaysInCurrentMonth) {
            this.currDay++;
        }
        else {
            // the curret day is the last day of the month
            // so reset the current date (day/month)
            this.currDay = 1;
            this.currMonth++;

            // see if the current month is greater than 12, which means we have to reset the month
            if (this.currMonth > 12) {
                this.currMonth = 1;
            }
        }

        //console.log('day forward', this.currDay, this.currMonth)
    }


    // this checks to see if the current date (day/month) which is responsible for counting the 
    // days diff has reached to the end date (second date)
    private isSecondDateMet = (): boolean => {
        if (this.secondMonth === this.currMonth && this.secondDay === this.currDay) {
            //console.log('second date met!')
            return true;
        }
        else
            return false;
    }

    // this looks at the year and finds out if it is a leap year (366 days)
    private isLeapYear = (year: number): boolean => {
        if (year % 4 !== 0)
            return false;

        if (year % 100 !== 0)
            return true;

        if (year % 400 === 0)
            return true;

        return false;
    }

    // this validates the date components to make sure they are passed in a correct format dd/MM/yyyy
    // and then split them to day/month/year components, the one which is less than the other become first 
    // and the other one becomes second compoant    
    private validateDates = () => {
        if (!this.firstDate || !this.secondDate){
            throw 'two date components should be provided in dd/MM/yyyy format!';
        }
        let firstDateSplit = this.firstDate.split('/');
        if (firstDateSplit.length !== 3)
            throw 'first date component is wrong!';

        let secondDateSplit = this.secondDate.split('/');
        if (secondDateSplit.length !== 3)
            throw 'second date component is wrong!';

        this.firstDay = Number(firstDateSplit[0]);
        if (!this.firstDate) throw 'day part of first date component is wrong!';

        this.firstMonth = Number(firstDateSplit[1]);
        if (!this.firstMonth) throw 'month part of first date component is wrong!';

        this.firstYear = Number(firstDateSplit[2]);
        if (!this.firstYear) throw 'year part of first date component is wrong!';

        this.secondDay = Number(secondDateSplit[0]);
        if (!this.secondDay) throw 'day part of second date component is wrong!';

        this.secondMonth = Number(secondDateSplit[1]);
        if (!this.secondMonth) throw 'month part of second date component is wrong!';

        this.secondYear = Number(secondDateSplit[2]);
        if (!this.secondYear) throw 'year part of second date component is wrong!';

        if (this.firstDay < 1 || this.firstDay > 31) {
            throw 'day part of first date component is wrong';
        }

        if (this.secondDay < 1 || this.secondDay > 31) {
            throw 'day part of second date component is wrong';
        }

        if (this.firstMonth < 1 || this.firstMonth > 12) {
            throw 'month part of first date component is wrong';
        }

        if (this.secondMonth < 1 || this.secondMonth > 12) {
            throw 'month part of second date component is wrong';
        }

        if (this.firstYear < 1900 || this.firstYear > 2999) {
            throw 'year part of first date component is wrong';
        }

        if (this.secondYear < 1900 || this.secondYear > 2999) {
            throw 'year part of second date component is wrong';
        }

        if (this.firstYear > this.secondYear ||
            ((this.firstYear === this.secondYear) && this.firstMonth > this.secondMonth) ||
            ((this.firstYear === this.secondYear && this.firstMonth === this.secondMonth) && this.firstDay > this.secondDay)) {
            this.swapDateComponents();
        }
    }

    // when the first date component is greater than the second date component, this function is used
    // to swap them
    private swapDateComponents = () => {
        let tempDay = this.firstDay;
        let tempMonth = this.firstMonth;
        let tempYear = this.firstYear;

        this.firstDay = this.secondDay;
        this.firstMonth = this.secondMonth;
        this.firstYear = this.secondYear;

        this.secondDay = tempDay;
        this.secondMonth = tempMonth;
        this.secondYear = tempYear;
    }
}

export = dateCalculator;