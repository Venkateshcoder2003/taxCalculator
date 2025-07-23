import * as readline from "readline";
import { TaxFactory } from "./utils/taxFactory";
import { ItemManager } from "./utils/itemManager";
import { Logger } from "./utils/Logger";
import {
  takeName,
  takePrice,
  takeQuantity,
  takeType,
  confirm,
  rl,
} from "./utils/takeInput";

// Initialize factory and manager instances.
const itemManager = new ItemManager();
const taxFactory = new TaxFactory();

//Recursive function to accept item input, create item via factory, and add to manager.
//Uses async/await to ensure sequential prompts.
async function takeItemInput() {
  try {
    // Create item using factory
    const name = await takeName();
    const price = await takePrice();
    const quantity = await takeQuantity();
    const type = await takeType();

    const item = taxFactory.createItem(name, price, quantity, type);
    itemManager.addItem(item);
  } catch (err: any) {
    Logger.error(`${err.message}`);
  }

  // Ask if user wants to enter more
  const moreInput = await confirm();
  if (moreInput) {
    takeItemInput(); // Continue Loop.
  } else {
    itemManager.printItems(); //add Items.
    rl.close(); //Close Input.
  }
}

// Start input loop
takeItemInput();
