//This is the file
import * as readline from "readline";
import { TaxFactory } from "./utils/taxFactory"; //Factory responsible for creating item objects.
import { InputParser } from "./utils/inputParser"; // Parses CLI arguments.
import { ItemManager } from "./utils/itemManager"; // Manages list of items and prints final result

//creating the interface for reading the inputs from user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creating instances of required classes
const manager = new ItemManager(); //Holds and manages created items.
const inputParser = new InputParser(); //object that Handles command-line parsing.
const taxFactory = new TaxFactory(); // Factory object Responsible for item creation based on type.

// Recursive function to continuously take user input.
function takeUserInput() {
  //asking the user whether he enters the items or not.
  rl.question(
    '\nDo you want to enter te details "y" for YES and "n" for NO(y/n): ',
    (answer) => {
      if (answer.toLocaleLowerCase() === "y") {
        // Prompt user to enter item details
        rl.question(
          'Enter args like: -name "Soap" -price 20 -quantity 2 -type raw\n: ',
          (userInput) => {
            //storing all the arguments in an array.
            const argument = ["node", "app.ts", ...userInput.trim().split(" ")];
            try {
              // Parsing  arguments into structured object.
              const parsedArguments = inputParser.parseArguments(argument);
              // Create appropriate item using factory based on type.
              const item = taxFactory.createItem(
                parsedArguments.name,
                parsedArguments.price,
                parsedArguments.quantity,
                parsedArguments.type
              );
              // Adding the item to manager list.
              manager.addItem(item);
              // Recursively asking the user  for next item.
              takeUserInput();
            } catch (err: any) {
              // Handling  any parsing or creation errors
              console.log(err.message);
              takeUserInput();
            }
          }
        );
      } else {
        // if User chose to stop entering data, then  printing the  final list.
        manager.printItems();
        rl.close(); // Close the input interface
      }
    }
  );
}
// Starting  input process
takeUserInput();
