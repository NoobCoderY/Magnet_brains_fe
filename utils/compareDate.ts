export interface TodoInterface {
    title: string;
    dueDate: string;
    description: string;
    status: boolean;
  }

export const compareDate = (dateString: string) => {
// Parse the date string into a Date object
const parts = dateString.split('/');
const year = parseInt(parts[2], 10);
const month = parseInt(parts[0], 10) - 1; // Month is zero-based
const day = parseInt(parts[1], 10)+1;

const inputDate = new Date(year, month, day);

// Get the current date and time
const currentDate = new Date();

// Compare the two Date objects
 if (inputDate < currentDate) {
     return true;
} 
}

export const dateSort = (dates:any) => {  
      // Custom date comparison function
    function compareDates(date1: TodoInterface, date2: TodoInterface): number {
        const FirstdateForComapre = date1.dueDate
        const  seconddateForComapre=date2.dueDate
        const [month1, day1, year1] = FirstdateForComapre.split('/').map(Number);
        const [month2, day2, year2] = seconddateForComapre.split('/').map(Number);
      
        if (year1 !== year2) {
          return year1 - year2;
        }
        if (month1 !== month2) {
          return month1 - month2;
        }
        return day1 - day2;
      }
    return  dates.sort(compareDates);
      
}



