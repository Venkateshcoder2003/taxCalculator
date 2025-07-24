import Course from "./course";
export interface User {
  fullName: string;
  age: number;
  address: string;
  rollNumber: number;
  courses: Course;
}
