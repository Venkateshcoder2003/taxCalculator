//Import required classes and utility functions
import { UserManager } from "../services/user_manager";
import { DataSerializer } from "../services/data_serializer";
import { UserFactory } from "../utils/user_factory";
import { InputHandler } from "../utils/input_handler";
import { InputValidator } from "../utils/input_validator";
import { Logger } from "../utils/logger";
import  {choices}  from "../models/choices";
import { handleAdd, handleDisplay, handleDelete, handleSave, handleExit } from "./menu_actions";

//Controller class to manage the menu and operations
export class MenuContoller {
  private userManager: UserManager;
  private userFactory: UserFactory;
  private dataSerializer: DataSerializer;

  //Constructor initializes services and loads existing user data
  constructor() {
    this.userManager = UserManager.getInstance();
    this.dataSerializer = DataSerializer.getInstance();
    this.userFactory = new UserFactory();

    this.initializeData();
  }

  //Load saved user data from disk, else set it to an empty array
  private initializeData() {
    try {
      const savedUserData = this.dataSerializer.loadDataFromDisk();
      this.userManager.setUsers(savedUserData);
    } catch {
      this.userManager.setUsers([]);
    }
  }

  //Displays the main menu and handles user choices in a loop
  async showMenu(): Promise<void> {
    while (true) {
      Logger.print("\n\n----- MENU -----");
      Logger.print("1. Add User");
      Logger.print("2. Display Users");
      Logger.print("3. Delete User");
      Logger.print("4. Save Users");
      Logger.print("5. Exit");

      //Ask user for their menu choice
      const choice = await InputHandler.getChoice(); //Gets student choice.

      //Perform action based on user's choice
      switch (choice) {
        case choices.ADD:
          try {
            await handleAdd();
          } catch (error) {
            Logger.error(`${error.message}`);
          }
          break;

        case choices.DISPLAY:
          try {
            await handleDisplay();
          } catch (error) {
            Logger.error(`${error.message}`);
          }
          break;

        case choices.DELETE:
          await handleDelete();
          break;

        case choices.SAVE:
          await handleSave();
          break;

        case choices.EXIT:
          await handleExit();
          return;

        default:
          Logger.info("Invalid choice. Please try again."); //If user enters invalid option
      }
    }
  }
}
