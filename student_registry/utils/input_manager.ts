import * as readline from "readline";
import Course from "../models/course";
import { Logger } from "./logger";

// Readline interface for terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Validates the user’s menu choice(1-5)
export async function validateChoice(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter your Choice(1-5): ", (userInput) => {
      const choice = parseInt(userInput.trim());
      if (choice >= 1 && choice <= 5) {
        res(choice);
      } else {
        Logger.info("Invalid choice. Please enter a number between 1 and 5.");
        // Recursively call and properly await the result
        res(validateChoice());
      }
    });
  });
}

//Asking user whether to save or not save data before exiting.
export async function saveDataBeforeExit(): Promise<string> {
  return new Promise((res) => {
    rl.question("Do You Want To Save Data Before Exit: ", (userInput) => {
      const choice = userInput.trim().toLowerCase();
      res(choice);
    });
  });
}

//Asking the student Full Name
export async function validateName(): Promise<string> {
  return new Promise((res) => {
    rl.question("Enter Name: ", (name) => {
      res(name);
    });
  });
}

//Validating student Age
export async function validateAge(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter Age: ", (userInput) => {
      const age = parseInt(userInput);
      if (age < 0) {
        res(validateAge());
      } else {
        res(age);
      }
    });
  });
}

//Validate student Address.
export async function validateAddress(): Promise<string> {
  return new Promise((res) => {
    rl.question("Enter Address: ", (userInput) => {
      if (typeof userInput === "string") {
        res(userInput);
      } else {
        res(validateAddress());
      }
    });
  });
}

//Validate student RollNumber.
export async function validateRollNumber(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter Your Roll Number: ", (userInput) => {
      const rollNumber = parseInt(userInput);
      if (rollNumber < 0) {
        res(validateRollNumber());
      } else {
        res(rollNumber);
      }
    });
  });
}

//Validate Student Courses.
export async function validateCourses(): Promise<Course[]> {
  return new Promise((res) => {
    rl.question("Enter your Courses A-F:(Comma Separated)", (userInput) => {
      const inputCourses: string[] = [];
      const parts = userInput.split(",");

      //COnverting student input to uppercase and removing leading and trailing spaces.
      for (let i = 0; i < parts.length; i++) {
        const toUpper = parts[i].trim().toUpperCase();
        if (toUpper) {
          inputCourses.push(toUpper);
        }
      }

      //Number of courses should be 4.
      if (inputCourses.length !== 4) {
        Logger.info(
          `Error: You must enter exactly 4 courses. You entered ${inputCourses.length}.`
        );
        res(validateCourses());
      }

      const validCourses = Object.keys(Course);
      let allValid = true;

      //Validating courses are valid or Not.
      for (let i = 0; i < inputCourses.length; i++) {
        let isValid = false;
        for (let j = 0; j < validCourses.length; j++) {
          if (inputCourses[i] === validCourses[j]) {
            isValid = true;
            break;
          }
        }

        if (isValid == false) {
          Logger.info(
            `The course '${inputCourses[i]}' is not valid. Please choose between A-F`
          );
          allValid = false;
          break;
        }
      }

      //Checking for duplicates.
      if (allValid) {
        for (let i = 0; i < inputCourses.length; i++) {
          for (let j = i + 1; j < inputCourses.length; j++) {
            if (inputCourses[i] === inputCourses[j]) {
              Logger.info(
                `Duplicate course found: '${inputCourses[i]}'. Please enter unique courses.`
              );
              allValid = false;
              break;
            }
          }
          if (!allValid) break;
        }
      }

      //If all valid then return the input courses.
      if (allValid) {
        const courseEnum: Course[] = [];
        for (let i = 0; i < inputCourses.length; i++) {
          courseEnum.push(inputCourses[i] as Course);
        }
        res(courseEnum);
      } else {
        Logger.info("Please Try Again");
        res(validateCourses());
      }
    });
  });
}

//PRomting user for custom sort.
export async function askForCustomSort(): Promise<any> {
  return new Promise((res) => {
    rl.question("Do you want customSort: ", (userInput) => {
      if (userInput === "y" || userInput === "yes") {
        res(true);
      } else {
        res(false);
      }
    });
  });
}

//Asking student to select a sorting field (validated)
export async function validateSortField(): Promise<
  "rollNumber" | "age" | "address" | "fullName"
> {
  const validFields = [
    "rollnumber",
    "roll",
    "age",
    "name",
    "fullname",
    "address",
  ];

  return new Promise((res) => {
    rl.question("Enter the field to sort by: ", (userInput) => {
      const field = userInput.trim().toLowerCase();

      if (validFields.includes(field)) {
        if (field === "rollNumber" || field === "roll") res("rollNumber");
        else if (field === "fullName" || field === "name") res("fullName");
        else res((field as "age") || "address");
      } else {
        Logger.info(
          "Invalid field. Please choose from: rollNumber, age, name, address"
        );
        res(validateSortField());
      }
    });
  });
}

//Asking student to select a sorting order.
export async function validateSortType(): Promise<"asc" | "desc"> {
  return new Promise((res) => {
    rl.question("Enter the Sorting Type: ", (userInput) => {
      const order = userInput.trim().toLowerCase();
      if (order === "asc" || order === "ascending") {
        res("asc");
      } else if (order === "desc" || order === "descending") {
        res("desc");
      } else {
        Logger.info(
          'Invalid Sorting Type Entered. Please Enter Either "asc" or "desc".'
        );
        res(validateSortType());
      }
    });
  });
}
//Closes the readline interface
export function closeRl(): void {
  rl.close();
}
