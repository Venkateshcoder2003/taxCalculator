import { User } from "../models/user"; // Import User interface
import { Logger } from "../utils/logger"; // import Logger
import Course from "../models/course"; // Import Course enum

export class UserManager {
  private static instance: UserManager; // Singleton instance
  private users: User[]; // Array to hold student objects

  // Private constructor to ensure that no one creates object.
  private constructor() {}

  //Singleton methid to share single instance across entire application.
  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  // Set users array while loading from disk.
  setUsers(users: User[]): void {
    this.users = users;
    this.sortUsers();
  }

  // Get list of all students.
  getUsers(): User[] {
    return this.users;
  }

  // Add new student to the list
  addUser(user: User): void {
    let exists = false;
    for (let u of this.users) {
      if (u.rollNumber === user.rollNumber) {
        exists = true;
        break;
      }
    }
    if (exists) Logger.error("Roll number already exists.");
    this.users.push(user);
    this.sortUsers();
  }

  //Deleting a student by rollNumber.
  deleteUser(rollNumber: number): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].rollNumber === rollNumber) {
        //splice takes (startIndex, numberOfItemsToBeDeletedFromThatIndex)
        this.users.splice(i, 1); // Remove 1 item at index i
        return true;
      }
    }
    return false;
  }

  // Sort students alphabetically by fullName, then by rollNumber.
  sortUsers(): void {
    this.users.sort((a, b) => {
      if (a.fullName < b.fullName) return -1;
      if (a.fullName > b.fullName) return 1;

      return a.rollNumber - b.rollNumber;
    });
  }

  // Sort students by given field (like name, age) and type (asc or desc)
  sortUsersBy(field: any, type: any): any {
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
          if (a.address > b.address) comparision = 1;
          comparision = 0;
          break;
        case "fullName":
          if (a.fullName < b.fullName) comparision = -1;
          if (a.fullName > b.fullName) comparision = 1;
          comparision = 0;
          break;
      }
      return type === "desc" ? -comparision : comparision;
    });
  }

  // Print all student Details.
  displayUsers(): void {
    if (this.users.length == 0) {
      Logger.info("No Student Details to Display.");
      return;
    }

    Logger.info(
      "\n============================================================"
    );
    Logger.info("RollNo | Name        | Age | Address     | Courses");
    Logger.info(
      "============================================================="
    );
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      Logger.info(
        `${user.rollNumber} | ${user.fullName} | ${user.age} | ${user.address} | ${user.courses}`
      );
    }
    Logger.info(
      "============================================================="
    );
  }
}
