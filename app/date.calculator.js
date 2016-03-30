'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class dateCalculator {
    constructor() {
        this.monthsWith31 = [1, 3, 5, 7, 8, 10, 12];
        this.monthsWith30 = [4, 6, 9, 11];
        this.monthsWith28 = [2];
        // this is the main public function which is called 
        // to calculate the days between two days
        this.calc = (firstDate, secondDate) => __awaiter(this, void 0, Promise, function* () {
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
        });
        // ****** to gain a better performance, Instead of just doing a simple loop from first date to second date
        // ****** I decided to first calculate the diff between yesrs and then get into more precise diff
        this.calcYearDiffInDays = () => {
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
        };
        // this counts the days from begining to the end and move the current date forward until
        // it gets to the final day and returns the number of days counted
        this.calcDaysDiff = () => {
            let daysDiff = 0;
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
            } while (!this.isSecondDateMet() && daysDiff < 370000);
            return daysDiff;
        };
        // this is responsible to move the current date (day/month) forward considering the number of days in a month
        this.moveCurrentDateForward = () => {
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
        };
        // this checks to see if the current date (day/month) which is responsible for counting the 
        // days diff has reached to the end date (second date)
        this.isSecondDateMet = () => {
            if (this.secondMonth === this.currMonth && this.secondDay === this.currDay) {
                //console.log('second date met!')
                return true;
            }
            else
                return false;
        };
        // this looks at the year and finds out if it is a leap year (366 days)
        this.isLeapYear = (year) => {
            if (year % 4 !== 0)
                return false;
            if (year % 100 !== 0)
                return true;
            if (year % 400 === 0)
                return true;
            return false;
        };
        // this validates the date components to make sure they are passed in a correct format dd/MM/yyyy
        // and then split them to day/month/year components, the one which is less than the other become first 
        // and the other one becomes second compoant    
        this.validateDates = () => {
            if (!this.firstDate || !this.secondDate) {
                throw 'two date components should be provided in dd/MM/yyyy format!';
            }
            let firstDateSplit = this.firstDate.split('/');
            if (firstDateSplit.length !== 3)
                throw 'first date component is wrong!';
            let secondDateSplit = this.secondDate.split('/');
            if (secondDateSplit.length !== 3)
                throw 'second date component is wrong!';
            this.firstDay = Number(firstDateSplit[0]);
            if (!this.firstDate)
                throw 'day part of first date component is wrong!';
            this.firstMonth = Number(firstDateSplit[1]);
            if (!this.firstMonth)
                throw 'month part of first date component is wrong!';
            this.firstYear = Number(firstDateSplit[2]);
            if (!this.firstYear)
                throw 'year part of first date component is wrong!';
            this.secondDay = Number(secondDateSplit[0]);
            if (!this.secondDay)
                throw 'day part of second date component is wrong!';
            this.secondMonth = Number(secondDateSplit[1]);
            if (!this.secondMonth)
                throw 'month part of second date component is wrong!';
            this.secondYear = Number(secondDateSplit[2]);
            if (!this.secondYear)
                throw 'year part of second date component is wrong!';
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
        };
        // when the first date component is greater than the second date component, this function is used
        // to swap them
        this.swapDateComponents = () => {
            let tempDay = this.firstDay;
            let tempMonth = this.firstMonth;
            let tempYear = this.firstYear;
            this.firstDay = this.secondDay;
            this.firstMonth = this.secondMonth;
            this.firstYear = this.secondYear;
            this.secondDay = tempDay;
            this.secondMonth = tempMonth;
            this.secondYear = tempYear;
        };
    }
}
module.exports = dateCalculator;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRlLmNhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7QUFHWjtJQUFBO1FBQ1ksaUJBQVksR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELGlCQUFZLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2QyxpQkFBWSxHQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFlckMsb0RBQW9EO1FBQ3BELHlDQUF5QztRQUN6QyxTQUFJLEdBQUcsQ0FBTyxTQUFTLEVBQUUsVUFBVTtZQUUvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3Qiw2RUFBNkU7WUFDN0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLDBDQUEwQztZQUMxQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUVoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFbkMsSUFBSSxNQUFNLEdBQUcsUUFBUSxHQUFHLGVBQWUsQ0FBQztZQUN4QyxpR0FBaUc7WUFDakcsd0JBQXdCO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDO1lBQ0QsNkZBQTZGO1lBRW5HLG9DQUFvQztZQUU5QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUEsQ0FBQTtRQUVELDBHQUEwRztRQUMxRyxpR0FBaUc7UUFDekYsdUJBQWtCLEdBQUc7WUFDekIsSUFBSSxTQUFT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QyxDQUFDO2dCQUM3QixNQUFNLGlDQUFpQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLDRDQUE0QyxDQUFDO1lBRXhFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFBQyxNQUFNLDhDQUE4QyxDQUFDO1lBRTNFLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLDZDQUE2QyxDQUFDO1lBRXpFLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLDZDQUE2QyxDQUFDO1lBRXpFLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFBQyxNQUFNLCtDQUErQyxDQUFDO1lBRTdFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFBQyxNQUFNLDhDQUE4QyxDQUFDO1lBRTNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSwyQ0FBMkMsQ0FBQztZQUN0RCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLDRDQUE0QyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sNkNBQTZDLENBQUM7WUFDeEQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTSw4Q0FBOEMsQ0FBQztZQUN6RCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLDRDQUE0QyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sNkNBQTZDLENBQUM7WUFDeEQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzVFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuSCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM5QixDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsaUdBQWlHO1FBQ2pHLGVBQWU7UUFDUCx1QkFBa0IsR0FBRztZQUN6QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUU5QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMvQixDQUFDLENBQUE7SUFDTCxDQUFDO0FBQUQsQ0FBQztBQUVELGlCQUFTLGNBQWMsQ0FBQyIsImZpbGUiOiJhcHAvZGF0ZS5jYWxjdWxhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcbmltcG9ydCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcclxuXHJcbmNsYXNzIGRhdGVDYWxjdWxhdG9yIHtcclxuICAgIHByaXZhdGUgbW9udGhzV2l0aDMxOiBudW1iZXJbXSA9IFsxLCAzLCA1LCA3LCA4LCAxMCwgMTJdO1xyXG4gICAgcHJpdmF0ZSBtb250aHNXaXRoMzA6IG51bWJlcltdID0gWzQsIDYsIDksIDExXTtcclxuICAgIHByaXZhdGUgbW9udGhzV2l0aDI4OiBudW1iZXJbXSA9IFsyXTtcclxuICAgIHByaXZhdGUgZmlyc3REYXRlOiBhbnk7XHJcbiAgICBwcml2YXRlIHNlY29uZERhdGU6IGFueTtcclxuICAgIHByaXZhdGUgZmlyc3REYXk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZmlyc3RNb250aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmaXJzdFllYXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2Vjb25kRGF5OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNlY29uZE1vbnRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNlY29uZFllYXI6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJEYXk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3Vyck1vbnRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJZZWFyOiBudW1iZXI7XHJcblxyXG5cclxuICAgIC8vIHRoaXMgaXMgdGhlIG1haW4gcHVibGljIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBcclxuICAgIC8vIHRvIGNhbGN1bGF0ZSB0aGUgZGF5cyBiZXR3ZWVuIHR3byBkYXlzXHJcbiAgICBjYWxjID0gYXN5bmMgKGZpcnN0RGF0ZSwgc2Vjb25kRGF0ZSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3REYXRlID0gZmlyc3REYXRlO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kRGF0ZSA9IHNlY29uZERhdGU7XHJcbiAgICAgICAgLy8gZmlyc3QgdmFsaWRhdGUgdGhlIGRhdGVzIGFuZCBzd2FwIHRoZW0gaWYgdGhleSBhcmUgcGFzc2VkIGluIGEgd3Jvbmcgb3JkZXJcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRGF0ZXMoKTtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgZGF5cyBkaWZmIGZvciB5ZWFycyBkaWZlcnJlY2VcclxuICAgICAgICBsZXQgZGF5c0RpZmZJblllYXJzID0gdGhpcy5jYWxjWWVhckRpZmZJbkRheXMoKTtcclxuXHJcbiAgICAgICAgbGV0IGRheXNEaWZmID0gdGhpcy5jYWxjRGF5c0RpZmYoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGRheXNEaWZmICsgZGF5c0RpZmZJblllYXJzO1xyXG4gICAgICAgIC8vIHRoZSByZXN1bHQgbWlnaHQgYmUgYSBuZWdhdGl2ZSBpZiB0aGUgZmlyc3QgZGF0ZSBhbmQgc2Vjb25kIGRhdGUgYXJlIHRoZSBzYW1lIHNvIG1ha2Ugc3VyZSB5b3VcclxuICAgICAgICAvLyByZXR1cm4gMCBpbiB0aGlzIGNhc2VcclxuICAgICAgICBpZiAocmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdkYXlzRGlmZkluWWVhcnMgJywgZGF5c0RpZmZJblllYXJzLCAnZGF5c0RpZmYgJyAsIGRheXNEaWZmLCAndG90YWwgJywgcmVzdWx0IClcclxuXHJcbiAgLy8gICAgICB0aGlzLmVtaXQoJ3Jlc3VsdCcsIHJlc3VsdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICoqKioqKiB0byBnYWluIGEgYmV0dGVyIHBlcmZvcm1hbmNlLCBJbnN0ZWFkIG9mIGp1c3QgZG9pbmcgYSBzaW1wbGUgbG9vcCBmcm9tIGZpcnN0IGRhdGUgdG8gc2Vjb25kIGRhdGVcclxuICAgIC8vICoqKioqKiBJIGRlY2lkZWQgdG8gZmlyc3QgY2FsY3VsYXRlIHRoZSBkaWZmIGJldHdlZW4geWVzcnMgYW5kIHRoZW4gZ2V0IGludG8gbW9yZSBwcmVjaXNlIGRpZmZcclxuICAgIHByaXZhdGUgY2FsY1llYXJEaWZmSW5EYXlzID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgbGV0IGZpcnN0WWVhciA9IHRoaXMuZmlyc3RZZWFyO1xyXG4gICAgICAgIGxldCBzZWNvbmRZZWFyID0gdGhpcy5zZWNvbmRZZWFyO1xyXG5cclxuICAgICAgICBpZiAoZmlyc3RZZWFyID09PSBzZWNvbmRZZWFyKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmlyc3RNb250aCA+IHRoaXMuc2Vjb25kTW9udGgpIHtcclxuICAgICAgICAgICAgLy8gdGhlIHllYXJzIGFyZSBkaWZlcnJlbnQgYnV0IHRoZSBmaXJzdCBtb250aCBpcyBncmF0ZXIgdGhhbiBcclxuICAgICAgICAgICAgLy90aGUgc2Vjb25kIG1vbnRoIHNvIGRvIGNvdW50IHRoZSBmaXJzdCB5ZWFyIGFzIGEgZnVsbCB5ZWFyXHJcbiAgICAgICAgICAgIGZpcnN0WWVhcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmZpcnN0TW9udGggPT0gdGhpcy5zZWNvbmRNb250aCAmJiB0aGlzLmZpcnN0RGF5ID4gdGhpcy5zZWNvbmREYXkpIHtcclxuICAgICAgICAgICAgLy8gdGhlIGZpcnN0IGFuZCBzZWNvbmQgbW9udGhzIGFyZSB0aGUgc2FtZSBhbmQgdGhlIGZpcnN0IGRheSBpcyBncmVhdGVyIHRoYW5cclxuICAgICAgICAgICAgLy8gdGhlIHNlY29uZCB5ZWFyIHNvIGRvbid0IGNvdW50IHRoZSBmaXJzdCB5ZWFyIGFzIGEgZnVsbCB5ZWFyXHJcbiAgICAgICAgICAgIGZpcnN0WWVhcisrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRheXMgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB5ZWFyID0gZmlyc3RZZWFyOyB5ZWFyIDwgc2Vjb25kWWVhcjsgeWVhcisrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTGVhcFllYXIoeWVhcikpIHtcclxuICAgICAgICAgICAgICAgIGRheXMgKz0gMzY2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRheXMgKz0gMzY1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBjb3VudHMgdGhlIGRheXMgZnJvbSBiZWdpbmluZyB0byB0aGUgZW5kIGFuZCBtb3ZlIHRoZSBjdXJyZW50IGRhdGUgZm9yd2FyZCB1bnRpbFxyXG4gICAgLy8gaXQgZ2V0cyB0byB0aGUgZmluYWwgZGF5IGFuZCByZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBjb3VudGVkXHJcbiAgICBwcml2YXRlIGNhbGNEYXlzRGlmZiA9ICgpOiBudW1iZXIgPT4ge1xyXG5cclxuICAgICAgICBsZXQgZGF5c0RpZmY6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuY3VyckRheSA9IHRoaXMuZmlyc3REYXk7XHJcbiAgICAgICAgdGhpcy5jdXJyTW9udGggPSB0aGlzLmZpcnN0TW9udGg7XHJcbiAgICAgICAgdGhpcy5jdXJyWWVhciA9IHRoaXMuc2Vjb25kWWVhcjtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGZpcnN0IGFuZCBzZWNvbmQgZGF0ZXMgYXJlIHRoZSBzYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWNvbmREYXRlTWV0KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRheXNEaWZmIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdlIGFyZSBhdCB0aGUgYmVnaW5pbmcgb2YgdGhlIHByb2Nlc3MgdG8gY291bnQgZGF5cywgc28gd2UgaGF2ZSB0byBiZSBjYXJlZnVsIGFib3V0XHJcbiAgICAgICAgLy8gdGhlIHBhcnRpYWwgZGF0ZXMgKGZpcnN0IGRheSBhbmQgbGFzdCBkYXkpLCBzbyBiZWZvcmUgY291bnRpbmcgd2UgbW92ZSB0aGUgY3VycmVudCBkYXkvbW9udGhcclxuICAgICAgICAvLyBmb3J3YXJkICAgICAgICBcclxuICAgICAgICB0aGlzLm1vdmVDdXJyZW50RGF0ZUZvcndhcmQoKTtcclxuICAgICAgICBpZiAodGhpcy5pc1NlY29uZERhdGVNZXQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5c0RpZmYgLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBkYXlzRGlmZisrO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXlzRGlmZik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vdmVDdXJyZW50RGF0ZUZvcndhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKCF0aGlzLmlzU2Vjb25kRGF0ZU1ldCgpICYmIGRheXNEaWZmIDwgMzcwMDAwKVxyXG4gICAgICAgIHJldHVybiBkYXlzRGlmZjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGlzIHJlc3BvbnNpYmxlIHRvIG1vdmUgdGhlIGN1cnJlbnQgZGF0ZSAoZGF5L21vbnRoKSBmb3J3YXJkIGNvbnNpZGVyaW5nIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIG1vbnRoXHJcbiAgICBwcml2YXRlIG1vdmVDdXJyZW50RGF0ZUZvcndhcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG51bWJlck9mRGF5c0luQ3VycmVudE1vbnRoID0gMDtcclxuICAgICAgICBpZiAodGhpcy5tb250aHNXaXRoMzEuaW5kZXhPZih0aGlzLmN1cnJNb250aCkgPiAtMSkge1xyXG4gICAgICAgICAgICBudW1iZXJPZkRheXNJbkN1cnJlbnRNb250aCA9IDMxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLm1vbnRoc1dpdGgzMC5pbmRleE9mKHRoaXMuY3Vyck1vbnRoKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIG51bWJlck9mRGF5c0luQ3VycmVudE1vbnRoID0gMzA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubW9udGhzV2l0aDI4LmluZGV4T2YodGhpcy5jdXJyTW9udGgpID4gLTEpIHtcclxuICAgICAgICAgICAgLy8gc2VlIGlmIHRoZSBjdXJyZW50IHllYXIgKHNlY29uZCB5ZWFyKSBpcyBhIGxlYXAgeWVhciBvciBub3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMZWFwWWVhcih0aGlzLmN1cnJZZWFyKSkge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZEYXlzSW5DdXJyZW50TW9udGggPSAyOTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG51bWJlck9mRGF5c0luQ3VycmVudE1vbnRoID0gMjg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bWJlck9mRGF5c0luQ3VycmVudE1vbnRoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdhbiBlcnJvciBpbiBjYWxjdWxhdGlvbiBvZiBudW1iZXJPZkRheXNJbkN1cnJlbnRNb250aCBoYXMgb2NjdXJlZCA8PGN1cnJlbnQgbW9udGg+PiAnICsgdGhpcy5jdXJyTW9udGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyRGF5IDwgbnVtYmVyT2ZEYXlzSW5DdXJyZW50TW9udGgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyRGF5Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGUgY3VycmV0IGRheSBpcyB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbnRoXHJcbiAgICAgICAgICAgIC8vIHNvIHJlc2V0IHRoZSBjdXJyZW50IGRhdGUgKGRheS9tb250aClcclxuICAgICAgICAgICAgdGhpcy5jdXJyRGF5ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyTW9udGgrKztcclxuXHJcbiAgICAgICAgICAgIC8vIHNlZSBpZiB0aGUgY3VycmVudCBtb250aCBpcyBncmVhdGVyIHRoYW4gMTIsIHdoaWNoIG1lYW5zIHdlIGhhdmUgdG8gcmVzZXQgdGhlIG1vbnRoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJNb250aCA+IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJNb250aCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RheSBmb3J3YXJkJywgdGhpcy5jdXJyRGF5LCB0aGlzLmN1cnJNb250aClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gdGhpcyBjaGVja3MgdG8gc2VlIGlmIHRoZSBjdXJyZW50IGRhdGUgKGRheS9tb250aCkgd2hpY2ggaXMgcmVzcG9uc2libGUgZm9yIGNvdW50aW5nIHRoZSBcclxuICAgIC8vIGRheXMgZGlmZiBoYXMgcmVhY2hlZCB0byB0aGUgZW5kIGRhdGUgKHNlY29uZCBkYXRlKVxyXG4gICAgcHJpdmF0ZSBpc1NlY29uZERhdGVNZXQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kTW9udGggPT09IHRoaXMuY3Vyck1vbnRoICYmIHRoaXMuc2Vjb25kRGF5ID09PSB0aGlzLmN1cnJEYXkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2Vjb25kIGRhdGUgbWV0IScpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGxvb2tzIGF0IHRoZSB5ZWFyIGFuZCBmaW5kcyBvdXQgaWYgaXQgaXMgYSBsZWFwIHllYXIgKDM2NiBkYXlzKVxyXG4gICAgcHJpdmF0ZSBpc0xlYXBZZWFyID0gKHllYXI6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGlmICh5ZWFyICUgNCAhPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoeWVhciAlIDEwMCAhPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGlmICh5ZWFyICUgNDAwID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMgdmFsaWRhdGVzIHRoZSBkYXRlIGNvbXBvbmVudHMgdG8gbWFrZSBzdXJlIHRoZXkgYXJlIHBhc3NlZCBpbiBhIGNvcnJlY3QgZm9ybWF0IGRkL01NL3l5eXlcclxuICAgIC8vIGFuZCB0aGVuIHNwbGl0IHRoZW0gdG8gZGF5L21vbnRoL3llYXIgY29tcG9uZW50cywgdGhlIG9uZSB3aGljaCBpcyBsZXNzIHRoYW4gdGhlIG90aGVyIGJlY29tZSBmaXJzdCBcclxuICAgIC8vIGFuZCB0aGUgb3RoZXIgb25lIGJlY29tZXMgc2Vjb25kIGNvbXBvYW50ICAgIFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZURhdGVzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5maXJzdERhdGUgfHwgIXRoaXMuc2Vjb25kRGF0ZSl7XHJcbiAgICAgICAgICAgIHRocm93ICd0d28gZGF0ZSBjb21wb25lbnRzIHNob3VsZCBiZSBwcm92aWRlZCBpbiBkZC9NTS95eXl5IGZvcm1hdCEnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmlyc3REYXRlU3BsaXQgPSB0aGlzLmZpcnN0RGF0ZS5zcGxpdCgnLycpO1xyXG4gICAgICAgIGlmIChmaXJzdERhdGVTcGxpdC5sZW5ndGggIT09IDMpXHJcbiAgICAgICAgICAgIHRocm93ICdmaXJzdCBkYXRlIGNvbXBvbmVudCBpcyB3cm9uZyEnO1xyXG5cclxuICAgICAgICBsZXQgc2Vjb25kRGF0ZVNwbGl0ID0gdGhpcy5zZWNvbmREYXRlLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHNlY29uZERhdGVTcGxpdC5sZW5ndGggIT09IDMpXHJcbiAgICAgICAgICAgIHRocm93ICdzZWNvbmQgZGF0ZSBjb21wb25lbnQgaXMgd3JvbmchJztcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdERheSA9IE51bWJlcihmaXJzdERhdGVTcGxpdFswXSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmZpcnN0RGF0ZSkgdGhyb3cgJ2RheSBwYXJ0IG9mIGZpcnN0IGRhdGUgY29tcG9uZW50IGlzIHdyb25nISc7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RNb250aCA9IE51bWJlcihmaXJzdERhdGVTcGxpdFsxXSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmZpcnN0TW9udGgpIHRocm93ICdtb250aCBwYXJ0IG9mIGZpcnN0IGRhdGUgY29tcG9uZW50IGlzIHdyb25nISc7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RZZWFyID0gTnVtYmVyKGZpcnN0RGF0ZVNwbGl0WzJdKTtcclxuICAgICAgICBpZiAoIXRoaXMuZmlyc3RZZWFyKSB0aHJvdyAneWVhciBwYXJ0IG9mIGZpcnN0IGRhdGUgY29tcG9uZW50IGlzIHdyb25nISc7XHJcblxyXG4gICAgICAgIHRoaXMuc2Vjb25kRGF5ID0gTnVtYmVyKHNlY29uZERhdGVTcGxpdFswXSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlY29uZERheSkgdGhyb3cgJ2RheSBwYXJ0IG9mIHNlY29uZCBkYXRlIGNvbXBvbmVudCBpcyB3cm9uZyEnO1xyXG5cclxuICAgICAgICB0aGlzLnNlY29uZE1vbnRoID0gTnVtYmVyKHNlY29uZERhdGVTcGxpdFsxXSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlY29uZE1vbnRoKSB0aHJvdyAnbW9udGggcGFydCBvZiBzZWNvbmQgZGF0ZSBjb21wb25lbnQgaXMgd3JvbmchJztcclxuXHJcbiAgICAgICAgdGhpcy5zZWNvbmRZZWFyID0gTnVtYmVyKHNlY29uZERhdGVTcGxpdFsyXSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlY29uZFllYXIpIHRocm93ICd5ZWFyIHBhcnQgb2Ygc2Vjb25kIGRhdGUgY29tcG9uZW50IGlzIHdyb25nISc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0RGF5IDwgMSB8fCB0aGlzLmZpcnN0RGF5ID4gMzEpIHtcclxuICAgICAgICAgICAgdGhyb3cgJ2RheSBwYXJ0IG9mIGZpcnN0IGRhdGUgY29tcG9uZW50IGlzIHdyb25nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlY29uZERheSA8IDEgfHwgdGhpcy5zZWNvbmREYXkgPiAzMSkge1xyXG4gICAgICAgICAgICB0aHJvdyAnZGF5IHBhcnQgb2Ygc2Vjb25kIGRhdGUgY29tcG9uZW50IGlzIHdyb25nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0TW9udGggPCAxIHx8IHRoaXMuZmlyc3RNb250aCA+IDEyKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdtb250aCBwYXJ0IG9mIGZpcnN0IGRhdGUgY29tcG9uZW50IGlzIHdyb25nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlY29uZE1vbnRoIDwgMSB8fCB0aGlzLnNlY29uZE1vbnRoID4gMTIpIHtcclxuICAgICAgICAgICAgdGhyb3cgJ21vbnRoIHBhcnQgb2Ygc2Vjb25kIGRhdGUgY29tcG9uZW50IGlzIHdyb25nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0WWVhciA8IDE5MDAgfHwgdGhpcy5maXJzdFllYXIgPiAyOTk5KSB7XHJcbiAgICAgICAgICAgIHRocm93ICd5ZWFyIHBhcnQgb2YgZmlyc3QgZGF0ZSBjb21wb25lbnQgaXMgd3JvbmcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kWWVhciA8IDE5MDAgfHwgdGhpcy5zZWNvbmRZZWFyID4gMjk5OSkge1xyXG4gICAgICAgICAgICB0aHJvdyAneWVhciBwYXJ0IG9mIHNlY29uZCBkYXRlIGNvbXBvbmVudCBpcyB3cm9uZyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5maXJzdFllYXIgPiB0aGlzLnNlY29uZFllYXIgfHxcclxuICAgICAgICAgICAgKCh0aGlzLmZpcnN0WWVhciA9PT0gdGhpcy5zZWNvbmRZZWFyKSAmJiB0aGlzLmZpcnN0TW9udGggPiB0aGlzLnNlY29uZE1vbnRoKSB8fFxyXG4gICAgICAgICAgICAoKHRoaXMuZmlyc3RZZWFyID09PSB0aGlzLnNlY29uZFllYXIgJiYgdGhpcy5maXJzdE1vbnRoID09PSB0aGlzLnNlY29uZE1vbnRoKSAmJiB0aGlzLmZpcnN0RGF5ID4gdGhpcy5zZWNvbmREYXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcERhdGVDb21wb25lbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHdoZW4gdGhlIGZpcnN0IGRhdGUgY29tcG9uZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kIGRhdGUgY29tcG9uZW50LCB0aGlzIGZ1bmN0aW9uIGlzIHVzZWRcclxuICAgIC8vIHRvIHN3YXAgdGhlbVxyXG4gICAgcHJpdmF0ZSBzd2FwRGF0ZUNvbXBvbmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRlbXBEYXkgPSB0aGlzLmZpcnN0RGF5O1xyXG4gICAgICAgIGxldCB0ZW1wTW9udGggPSB0aGlzLmZpcnN0TW9udGg7XHJcbiAgICAgICAgbGV0IHRlbXBZZWFyID0gdGhpcy5maXJzdFllYXI7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3REYXkgPSB0aGlzLnNlY29uZERheTtcclxuICAgICAgICB0aGlzLmZpcnN0TW9udGggPSB0aGlzLnNlY29uZE1vbnRoO1xyXG4gICAgICAgIHRoaXMuZmlyc3RZZWFyID0gdGhpcy5zZWNvbmRZZWFyO1xyXG5cclxuICAgICAgICB0aGlzLnNlY29uZERheSA9IHRlbXBEYXk7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRNb250aCA9IHRlbXBNb250aDtcclxuICAgICAgICB0aGlzLnNlY29uZFllYXIgPSB0ZW1wWWVhcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ID0gZGF0ZUNhbGN1bGF0b3I7Il0sInNvdXJjZVJvb3QiOiIuLiJ9
