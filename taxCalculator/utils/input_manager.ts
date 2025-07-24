import { Logger } from "./logger";
import * as readline from "readline";

// Readline interface for terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Prompts user for item name.
export function validateName(): Promise<string> {
  return new Promise((res) => {
    rl.question("Enter Name: ", (name) => {
      res(name);
    });
  });
}

//Prompts user for item Price.
export function validatePrice(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter Price: ", (userInput) => {
      const price = parseFloat(userInput);
      if (price < 0) {
        Logger.error("Price can't be less than 0.");
        res(validatePrice());
      } else {
        res(price);
      }
    });
  });
}

//Prompts user for item Quantity.
export function validateQuantity(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter Quantity: ", (userInput) => {
      const quantity = parseInt(userInput);
      console.log(userInput);
      if (quantity < 1) {
        Logger.info(
          "Quantity must be greater than 1. Please provide a valid number."
        );
        res(validateQuantity());
      } else {
        res(quantity);
      }
    });
  });
}

//Prompts user for item Type.
export function validateType(): Promise<string> {
  return new Promise((res) => {
    rl.question(
      "Enter type (1 for RAW, 2 for MANUFACTURED, 3 for IMPORTED): ",
      (typeStr) => {
        switch (typeStr.trim()) {
          case "1":
            res("raw");
            break;
          case "2":
            res("manufactured");
            break;
          case "3":
            res("imported");
            break;
          default:
            Logger.info(
              "Invalid type. Please enter 1(Raw), 2(Manufactured), or 3(Imported)."
            );
            res(validateType());
        }
      }
    );
  });
}

//Asks user if they want to continue adding items.
export function confirm(): Promise<boolean> {
  return new Promise((res) => {
    rl.question("Do you want to enter another item? (y/n): ", (again) => {
      res(again.trim().toLowerCase() === "y");
    });
  });
}

export function closeRl(): void {
  rl.close();
}

