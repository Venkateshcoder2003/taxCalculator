import { User } from "../models/user"; //Import User interface
import { Logger } from "../utils/logger"; //import Logger
import Course from "../models/course"; //Import Course enum

export class UserManager {
  private static instance: UserManager; //Singleton instance
  private users: User[]; //Array to hold student objects

  //Private constructor to ensure that no one creates object
  private constructor() {}

  //Singleton method to share single instance across entire application
  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  //Set users array while loading from disk
  setUsers(users: User[]): void {
    this.users = users;
    if (this.users.length > 1) {
      this.sortUsersBy();
    }
  }

  //Get list of all students
  getUsers(): User[] {
    return this.users;
  }

  //Add new student to the list
  addUser(user: User): boolean {
    let exists = false;
    for (let u of this.users) {
      if (u.rollNumber === user.rollNumber) {
        exists = true;
        break;
      }
    }
    if (exists) {
      Logger.error("Roll number already exists.");
      return true;
    } else {
      this.users.push(user);
      this.sortUsersBy();
    }
  }

  //Delete student record  from the list using Binary Search
  deleteUser(rollNumber: number): boolean {
    let left = 0;
    let right = this.users.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midRollNumber = this.users[mid].rollNumber;

      if (midRollNumber === rollNumber) {
        this.users.splice(mid, 1); // Remove user at index mid
        return true;
      } else if (midRollNumber < rollNumber) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return false;
  }

  //Sort students by given field (like name, age) and type (asc or desc)
  sortUsersBy(field: any = "fullName", type: any = "asc"): any {
    this.users.sort((a, b) => {
      let comparision = 0;

      switch (field) {
        case "rollNumber":
          comparision = a.rollNumber - b.rollNumber;
          break;
        case "age":
          comparision = a.age - b.age;
          break;
        case "address":
          if (a.address < b.address) comparision = -1;
          else if (a.address > b.address) comparision = 1;
          else comparision = 0;
          break;
        case "fullName":
        default:
          if (a.fullName < b.fullName) comparision = -1;
          else if (a.fullName > b.fullName) comparision = 1;
          else {
            comparision = a.rollNumber - b.rollNumber;
          }
          break;
      }
      return type === "desc" ? -comparision : comparision;
    });
  }

  //Print all student Details
  displayUsers(): void {
    if (this.users.length === 0) {
      Logger.print("No Student Details to Display.");
      return;
    }

    Logger.print(
      "\n=============================================================="
    );
    Logger.print("RollNo | Name           | Age | Address        | Courses");
    Logger.print(
      "=============================================================="
    );

    for (const user of this.users) {
      const roll = String(user.rollNumber).padEnd(6, " ");
      const name = user.fullName.padEnd(14, " ");
      const age = String(user.age).padEnd(3, " ");
      const address = user.address.padEnd(14, " ");
      const courses = user.courses; // assuming it's an array

      Logger.print(`${roll} | ${name} | ${age} | ${address} | ${courses}`);
    }

    Logger.print(
      "=============================================================="
    );
  }
}
