//import all items
//This taxFactory.ts is a main factory class for creating instances of required type based on user input
//This ensures SRP and OCP
//SRP-Single responsibility principle
//OCP-open closed principle

import { importedItem } from "../src/models/importedItem";
import { manufacturedItem } from "../src/models/manufacturedItem";
import { rawItem } from "../src/models/rawItem";

//Factory class to abstract object creation logic based on input type.
export class TaxFactory {
  createItem(name: string, price: number, quantity: number, type: string) {
    //case-sensitive type handling using string function.
    let lowerType = type.toLocaleLowerCase();

    //Dynamically creating the item based on user input.
    if (lowerType == "raw") {
      return new rawItem(name, price, quantity, type);
    } else if (lowerType == "manufactured") {
      return new manufacturedItem(name, price, quantity, type);
    } else if (lowerType == "imported") {
      return new importedItem(name, price, quantity, type);
    } else {
      //if the item is not the one listed above then an error is returned with an appropriate message.
      throw new Error("Invalid item type: " + type);
    }
  }
}
