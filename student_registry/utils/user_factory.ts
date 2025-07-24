import { User } from "../models/user";
import Course from "../models/course";

export class UserFactory {
  createUser(
    fullName: string,
    age: number,
    address: string,
    rollNumber: number,
    courses: any
  ): User {
    return {
      fullName: fullName.trim(),
      age,
      address: address.trim(),
      rollNumber,
      courses,
    };
  }
}
