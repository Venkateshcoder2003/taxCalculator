import * as readline from "readline";
import { UserManager } from "../services/user_manager";
import {
  validateChoice,
  validateName,
  validateAge,
  validateAddress,
  validateRollNumber,
  validateCourses,
  saveDataBeforeExit,
  closeRl,
} from "../utils/input_manager";
import { UserFactory } from "./user_factory";
import { choises } from "../models/choises";
import { Serializer } from "../services/serializer";
import { Logger } from "./logger";

const userFactory = new UserFactory();
const serializer = new Serializer();

export async function showMenu(): Promise<void> {
  const manager = UserManager.getInstance();

  while (true) {
    Logger.info("\n----- MENU -----");
    Logger.info("1. Add User");
    Logger.info("2. Display Users");
    Logger.info("3. Delete User");
    Logger.info("4. Save Users");
    Logger.info("5. Exit");

    const choice = await validateChoice();

    switch (choice) {
      case choises.ADD: {
        try {
          const fullName = await validateName();
          const age = await validateAge();
          const address = await validateAddress();
          const rollNumber = await validateRollNumber();
          const courses = await validateCourses();

          const user = userFactory.createUser(
            fullName,
            age,
            address,
            rollNumber,
            courses
          );
          manager.addUser(user);
          Logger.info("User Added Successfully");
        } catch (err: any) {
          Logger.error(`${err.message}`);
        }
        break;
      } //case 1
      case choises.DISPLAY: {
        break;
      }
      case choises.DELETE: {
        const rollNumber = await validateRollNumber();
        Logger.info(
          `User data with roll RollNumber ${rollNumber} deleted Successfully`
        );
        manager.deleteUser(rollNumber);
        break;
      }
      case choises.UPDATE: {
        serializer.saveDataToDisk(manager.getUsers());
        Logger.info("User data Update in Student Registry");
        break;
      }
      case choises.EXIT: {
        const save = await saveDataBeforeExit();
        if (save === "y") {
          serializer.saveDataToDisk(manager.getUsers());
          Logger.info(" User Data saved.");
        }
        
          closeRl();
        return;
        
      }
      default:
        Logger.info("Invalid choice. Please try again.");
    } //switch
  } //whle loop
}
