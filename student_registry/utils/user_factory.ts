//Importing the necessary models.
import { User } from "../models/user";

//Factory Class responsible for creatig student object.
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
