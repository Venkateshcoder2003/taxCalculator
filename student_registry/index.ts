import { Serializer } from "./services/serializer";
import { UserManager} from "./services/user_manager";
import { showMenu } from "./utils/menu";


const serializer = new Serializer();
const Instance = UserManager.getInstance();
const savedStudentRecorde = serializer.loadDataFromDisk();

Instance.setUsers(savedStudentRecorde);
showMenu();
