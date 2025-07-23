import { Logger } from "./Logger";
import * as readline from "readline";

// Readline interface for terminal input/output
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Prompts user for item name.
export function takeName(): Promise<string> {
  return new Promise((res) => {
    rl.question("Enter Name: ", (name) => {
      res(name);
    });
  });
}

//Prompts user for item Price.
export function takePrice(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter Price: ", (userInput) => {
      const price = parseFloat(userInput);
      if (price < 0) {
        Logger.error("Price can't be Negative");
        res(takePrice());
      } else {
        res(price);
      }
    });
  });
}

//Prompts user for item Quantity.
export function takeQuantity(): Promise<number> {
  return new Promise((res) => {
    rl.question("Enter quantity: ", (userInput) => {
      const quantity = parseInt(userInput);
      if (quantity < 1) {
        Logger.info("Invalid quantity. Please enter a positive integer.");
        res(takeQuantity());
      } else {
        res(quantity);
      }
    });
  });
}

//Prompts user for item Type.
export function takeType(): Promise<string> {
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
            Logger.info("Invalid type. Please enter 1, 2, or 3.");
            res(takeType());
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
