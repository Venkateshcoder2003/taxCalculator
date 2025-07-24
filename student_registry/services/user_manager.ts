import { User } from "../models/user";
import { Logger } from "../utils/logger";

export class UserManager {
  private static instance: UserManager;
  private users: User[];

  private constructor() {}

  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  setUsers(users: User[]): void {
    this.users = users;
    this.sortUsers();
  }

  getUsers(): User[] {
    return this.users;
  }

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

  sortUsers(): void {}
}
