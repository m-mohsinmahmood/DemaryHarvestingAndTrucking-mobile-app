/* eslint-disable max-len */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getDate(){
    // Original date string
// const originalDateString = 'Fri Apr 14 2023 21:28:42 GMT+0500';

// Create a new Date object from the original date string
const originalDate = new Date();

// Get the year, month, day, hours, minutes, and seconds from the original date
const year = originalDate.getFullYear();
const month = originalDate.getMonth() + 1; // Month is zero-indexed, so we add 1
const day = originalDate.getDate();
const hours = originalDate.getHours();
const minutes = originalDate.getMinutes();
const seconds = originalDate.getSeconds();

// Format the new date string in the desired format
return  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

// Output the new date string
// console.log(newDateString); // Output: 2023-04-14 15:28:42

  }
}
