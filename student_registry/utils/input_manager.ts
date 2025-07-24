import * as readline from "readline";
import Course from "../models/course";
import { Logger } from "./logger";

// Readline interface for terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function validateChoice():Promise<number>{
    return new Promise((res)=>{
        rl.question("Enter your Choice(1-5): ", (userInput)=>{
            const choice=parseInt(userInput.trim());
            if(choice >=1 &&  choice<=5){
                res(choice);
            }else{
                Logger.info("Invalid choice. Please enter a number between 1 and 5.");
                // Recursively call and properly await the result
                res(validateChoice());
            }
        })
    })
}

export async function saveDataBeforeExit():Promise<string>{
    return new Promise((res)=>{
        rl.question("Do You Want To Save Data Before Exit: ", (userInput)=>{
            const choice=userInput.trim().toLowerCase();
            res(choice);
        })
    })
}

export async function validateName(): Promise<string> {
  return new Promise((res) => {
    rl.question("Enter Name: ", (name) => {
      res(name);
    });
  });
}

export async function validateAge():Promise<number>{
    return new Promise((res)=>{
        rl.question(("Enter Age: "), (userInput)=>{
            const age = parseInt(userInput);
            if(age <0 ){
                res(validateAge());
            }else{
                res(age);
            }
        })
    })
}

export async function validateAddress():Promise<string>{
    return new Promise((res)=>{
        rl.question("Enter Address: ", (userInput)=>{
            if(typeof userInput === 'string'){
                res(userInput);
            }else{
                res(validateAddress());
            }
        })
    })
}

export async function validateRollNumber():Promise<number>{
    return new Promise((res)=>{
        rl.question("Enter Your Roll Number: ", (userInput)=>{
            const rollNumber = parseInt(userInput);
            if(rollNumber<0){
                res(validateRollNumber());
            }else {
                res(rollNumber);
            }
        })
    })
}

// export async function validateCourses():Promise<Course>{
//     return new Promise((res)=>{
//         rl.question("Enter your courses A-F(comma Separated): ", (userInput)=>{
//             const validCourses = Object.keys(Course);
//             if(userInput.length == 4){
//                 for(let course of userInput){
//                     if(!validCourses.includes(course)){
//                         console.log(`The course ${course} is Not Valid Please chooose between A-F`);
//                         res(validateCourses());
//                     }
//                 }
            
//                 res(userInput as Course);
//             }else{
//                 res(validateCourses());
//             }
//         })
//     })
// }

export async function validateCourses():Promise<Course[]>{
    return new Promise((res)=>{
        rl.question("Enter your Courses A-F:(Comma Separated)", (userInput)=>{
            const inputCourses:string[]=[];
            const parts = userInput.split(",");

            for(let i=0;i<parts.length;i++){
                const toUpper = parts[i].trim().toUpperCase();
                if(toUpper){
                    inputCourses.push(toUpper);
                }
            }
            if(inputCourses.length !== 4){
                Logger.info(`Error: You must enter exactly 4 courses. You entered ${inputCourses.length}.`);
                res(validateCourses());
            }

            const validCourses = Object.keys(Course);
            let allValid = true;

            for(let i=0;i<inputCourses.length;i++){
                let isValid = false;
                for(let j=0;j<validCourses.length;j++){
                    if(inputCourses[i] ===validCourses[j]){
                        isValid = true;
                        break;
                    }
                }

                if(isValid == false){
                    Logger.info(`The course '${inputCourses[i]}' is not valid. Please choose between A-F`);
                    allValid = false;
                    break;
                }
            }

            //not be duplicated
               if (allValid) {
                for (let i = 0; i < inputCourses.length; i++) {
                    for (let j = i + 1; j < inputCourses.length; j++) {
                        if (inputCourses[i] === inputCourses[j]) {
                            Logger.info(`Duplicate course found: '${inputCourses[i]}'. Please enter unique courses.`);
                            allValid = false;
                            break;
                        }
                    }
                    if (!allValid) break;
                }
            }
            
            if(allValid){
                const courseEnum:Course[]=[];
                for(let i=0;i<inputCourses.length;i++){
                    courseEnum.push(inputCourses[i] as Course);
                }
                res(courseEnum);
            }
            else {
                Logger.info("Please Try Again");
                res(validateCourses());
            }

        })
    })
}


export function closeRl(): void {
  rl.close();
}


