// Importing the class for handling imported items.
import { importedItem } from "../src/models/importedItem";
// Importing the class for handling manufactured items.
import { manufacturedItem } from "../src/models/manufacturedItem";
// Importing the class for handling raw items.
import { rawItem } from "../src/models/rawItem";
import { Logger } from "./Logger";

// Enum to restrict the type of items.
export enum ItemType {
  Raw = "raw",
  Manufactured = "manufactured",
  Imported = "imported",
}

//Factory class to abstract object creation logic based on input type.
export class TaxFactory {
  createItem(name: string, price: number, quantity: number, type: string) {
    //case-sensitive type handling using string function.
    let lowerType = type.toLocaleLowerCase();

    //Dynamically creating the item based on user input.

    switch (lowerType) {
      case ItemType.Raw:
        return new rawItem(name, price, quantity, type);

      case ItemType.Manufactured:
        return new manufacturedItem(name, price, quantity, type);

      case ItemType.Imported:
        return new importedItem(name, price, quantity, type);

      default:
        Logger.error(`Invalid item type: ${type}`);
    }
  }
}
