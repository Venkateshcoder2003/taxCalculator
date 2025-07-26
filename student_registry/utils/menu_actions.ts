import { UserManager } from "../services/user_manager";
import { DataSerializer } from "../services/data_serializer";
import { UserFactory } from "../utils/user_factory";
import { InputHandler } from "../utils/input_handler";
import { InputValidator } from "../utils/input_validator";
import { Logger } from "../utils/logger";
import { choices } from "../models/choices";

const userManager = UserManager.getInstance();
const dataSerializer = DataSerializer.getInstance();
const userFactory = new UserFactory();

//Handles logic for adding a new user
export async function handleAdd(): Promise<void> {
  const userInput = await InputHandler.getUserInput(); //Get user Input
  const validatedData = await InputValidator.validateAndGetUserData(userInput); //Validates user input

  //Creates user object
  const user = userFactory.createUser(
    validatedData.fullName,
    validatedData.age,
    validatedData.address,
    validatedData.rollNumber,
    validatedData.courses
  );

  //Add user to list, if successful then save data to disk
  const addResult = userManager.addUser(user);
  if (!addResult) {
    dataSerializer.saveDataToDisk(userManager.getUsers());
    Logger.info("User Added Successfully");
    Logger.log(user);
  }
}

/**
 *Handles display of all user data.
 * If custom sort is selected, asks for sort field and type
 * Otherwise, shows default sorting (by name and roll number)
 */
export async function handleDisplay(): Promise<void> {
  const wantCustomSort = await InputHandler.getYesNoInput(
    "Do you want to sort on data: "
  );
  if (wantCustomSort) {
    const usersFromFile = dataSerializer.loadDataFromDisk();
    if (usersFromFile.length === 0) {
      Logger.info("No Student Records found in the database.");
      return;
    }

    //Get and validate field and type of sort
    const sortFieldInput = await InputHandler.getSortField();
    const sortFieldValidation =
      InputValidator.validateSortField(sortFieldInput);

    if (!sortFieldValidation.isValid) {
      Logger.error(sortFieldValidation.error!);
      return;
    }

    const sortTypeInput = await InputHandler.getSortType();
    const sortTypeValidation = InputValidator.validateSortType(sortTypeInput);

    if (!sortTypeValidation.isValid) {
      Logger.error(sortTypeValidation.error!);
      return;
    }

    //Perform custom sort and display users
    userManager.sortUsersBy(
      sortFieldValidation.value!,
      sortTypeValidation.value!
    );
    Logger.info(
      `Sorted by ${sortFieldValidation.value} in ${sortTypeValidation.value}.`
    );
    userManager.displayUsers();
  } else {
    const usersFromFile = dataSerializer.loadDataFromDisk();
    if (usersFromFile.length === 0) {
      Logger.info("No Student Records found in the database.");
      return;
    }
    Logger.info(
      "Here is your data with default Sorting By Name and Roll Number: "
    );
    userManager.setUsers(usersFromFile);
    userManager.displayUsers();
  }
}

//Handles deletion of a user by roll number
export async function handleDelete(): Promise<void> {
  const rollNumberInput = await InputHandler.getRollNumberForDelete(
    "Enter Roll Number to Delete: "
  );
  const rollNumberValidation = InputValidator.validateRollNumberForDelete(
    rollNumberInput.toString()
  );

  if (!rollNumberValidation.isValid) {
    Logger.error(rollNumberValidation.error!);
    return;
  }

  userManager.sortUsersBy();
  const deleted = userManager.deleteUser(rollNumberValidation.value!);
  dataSerializer.saveDataToDisk(userManager.getUsers());

  if (deleted) {
    Logger.info(
      `User With Roll Number ${rollNumberValidation.value} Deleted Successfully`
    );
    userManager.displayUsers();
  } else {
    Logger.info(
      `User data with roll number ${rollNumberValidation.value} is Not Present`
    );
  }
}

//Handles saving all current user data to disk
export async function handleSave(): Promise<void> {
  userManager.sortUsersBy();
  dataSerializer.saveDataToDisk(userManager.getUsers());
  Logger.info("User data Updated in Student Registry");
}

/**
 *Handles clean exit from the application.
 *  Asks whether to save data before exiting
 *  Saves if needed
 *  Closes input stream
 */
export async function handleExit(): Promise<void> {
  const save = await InputHandler.getYesNoInput(
    "Do You Want To Save Data Before Exit: "
  );
  if (save) {
    dataSerializer.saveDataToDisk(userManager.getUsers());
    Logger.info("User Data saved.");
  }
  InputHandler.close();
}
