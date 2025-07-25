//Importing the Course enum
import Course from "./course";
//Defining the structure of a 'User' object using Interface.
export interface User {
  fullName: string;
  age: number;
  address: string;
  rollNumber: number;
  courses: Course;
}
