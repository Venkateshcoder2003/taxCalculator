import * as readline from "readline";
import { TaxFactory } from "./utils/tax_calculator_factory";
import { ItemBiller } from "./utils/item_biller";
import { Logger } from "./utils/logger";
import {
  validateName,
  validatePrice,
  validateQuantity,
  validateType,
  confirm,
  closeRl,
} from "./utils/input_manager";

// Initialize factory and manager instances.
const itemBiller = new ItemBiller();
const taxFactory = new TaxFactory();

//Recursive function to accept item input, create item via factory, and add to manager.
//Uses async/await to ensure sequential prompts.
async function takeItemInput() {
  try {
    // Create item using factory
    const name = await validateName();
    const price = await validatePrice();
    const quantity = await validateQuantity();
    const type = await validateType();

    const item = taxFactory.createItem(name, price, quantity, type);
    itemBiller.addItem(item);
  } catch (err: any) {
    Logger.error(`${err.message}`);
  }

  // Ask if user wants to enter more
  const moreInput = await confirm();
  if (moreInput) {
    takeItemInput(); // Continue Loop.
  } else {
    itemBiller.printItems(); //add Items.
    closeRl(); //close Input loop
  }
}

// Start input loop
takeItemInput();
