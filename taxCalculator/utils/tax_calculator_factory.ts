// Importing the class for handling imported items.
import { importedItem } from "../src/models/imported_item";
// Importing the class for handling manufactured items.
import { manufacturedItem } from "../src/models/manufactured_item";
// Importing the class for handling raw items.
import { rawItem } from "../src/models/raw_item";
import { Logger } from "./logger";

// Enum to restrict the type of items.
export enum ItemType {
  RAW = "raw",
  MANUFACTURED = "manufactured",
  IMPORTED = "imported",
}

//Factory class to abstract object creation logic based on input type.
export class TaxFactory {
  createItem(name: string, price: number, quantity: number, type: string) {
    //case-sensitive type handling using string function.
    let lowerType = type.toLocaleLowerCase();

    //Dynamically creating the item based on user input.

    switch (lowerType) {
      case ItemType.RAW:
        return new rawItem(name, price, quantity, type);

      case ItemType.MANUFACTURED:
        return new manufacturedItem(name, price, quantity, type);

      case ItemType.IMPORTED:
        return new importedItem(name, price, quantity, type);

      default:
        Logger.error(`Invalid item type: ${type}`);
    }
  }
}
