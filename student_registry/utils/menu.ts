// Importing required modules and utilities.
import * as readline from "readline";
import { UserManager } from "../services/student_manager";
import {
  validateChoice,
  validateName,
  validateAge,
  validateAddress,
  validateRollNumber,
  validateCourses,
  saveDataBeforeExit,
  askForCustomSort,
  validateSortField,
  validateSortType,
  closeRl,
} from "../utils/input_manager";
import { UserFactory } from "./user_factory";
import { choises } from "../models/choises";
import { Serializer } from "../services/serializer";
import { Logger } from "./logger";

//Creating instances of UserFactory and Serializer
const userFactory = new UserFactory();
const serializer = new Serializer();
const manager = UserManager.getInstance();

//This Function Displays teh menu.
export async function showMenu(): Promise<void> {
  while (true) {
    Logger.info("\n\n----- MENU -----");
    Logger.info("1. Add User");
    Logger.info("2. Display Users");
    Logger.info("3. Delete User");
    Logger.info("4. Save Users");
    Logger.info("5. Exit");

    const choice = await validateChoice(); //Gets student choice.

    switch (choice) {
      case choises.ADD: {
        try {
          //Asking Student input and Validating the input.
          const fullName = await validateName();
          const age = await validateAge();
          const address = await validateAddress();
          const rollNumber = await validateRollNumber();
          const courses = await validateCourses();

          //Creating Student Object.
          const user = userFactory.createUser(
            fullName,
            age,
            address,
            rollNumber,
            courses
          );

          //Storing the student details Temporarly.
          manager.addUser(user);
          Logger.info("User Added Successfully");
        } catch (err: any) {
          Logger.error(`${err.message}`);
        }
        break;
      }

      case choises.DISPLAY: {
        try {
          //Loading Available Student details.
          const userFromFile = serializer.loadDataFromDisk();
          if (userFromFile.length === 0) {
            Logger.info("No Student Records found in the database.");
            break;
          }

          manager.setUsers(userFromFile);
          manager.displayUsers();
          //Asking  student if he want to sort the data.
          const wantCustomSort = await askForCustomSort();
          if (wantCustomSort) {
            const sortField = await validateSortField();
            const sortType = await validateSortType();

            manager.sortUsersBy(sortField, sortType);
            Logger.info(`Sorted by ${sortField} in ${sortType}.`);
            manager.displayUsers();
          }
        } catch (err) {
          Logger.error("Error loading users.");
        }
        break;
      }
      case choises.DELETE: {
        //Deleting the student by rollNUmber
        const rollNumber = await validateRollNumber();
        Logger.info(
          `User data with roll RollNumber ${rollNumber} deleted Successfully`
        );
        manager.deleteUser(rollNumber);
        break;
      }

      //Updating or saving the student details to disk.
      case choises.UPDATE: {
        manager.sortUsers();
        serializer.saveDataToDisk(manager.getUsers());
        Logger.info("User data Update in Student Registry");
        break;
      }
      case choises.EXIT: {
        const save = await saveDataBeforeExit();
        if (save === "y" || save == "yes") {
          serializer.saveDataToDisk(manager.getUsers());
          Logger.info(" User Data saved.");
        }

        //Closing the readline interface and exit.
        closeRl();
        return;
      }
      default:
        Logger.info("Invalid choice. Please try again.");
    } //switch
  } //whle loop
}
