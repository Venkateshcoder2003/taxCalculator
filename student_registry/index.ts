//Importing Required Modules.
import { Serializer } from "./services/serializer";
import { UserManager } from "./services/student_manager";
import { showMenu } from "./utils/menu";

//Creating serializer Instance to save and load data from disk.
const serializer = new Serializer();
//Creatig a single instance of userManager.
const Instance = UserManager.getInstance();
//Loading saved student records from disk.
const savedStudentRecorde = serializer.loadDataFromDisk();
//stes the student data to access easily.
Instance.setUsers(savedStudentRecorde);
//Display the interactive menu(Start of Application).
showMenu();
