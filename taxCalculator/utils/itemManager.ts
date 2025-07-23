import { Item } from "../src/models/item";
import { Logger } from "./Logger";

// Manager class to handle storing and displaying items.
export class ItemManager {
  //array to hold multiple Item instances.
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  // Prints details of all added items with tax calculation
  printItems(): void {
    console.log("\n🧾 Final Bill Summary:\n");
    for (const item of this.items) {
      //calculating the tax and final price for each item.
      const tax = item.calculateTax();
      const finalPrice = item.getFinalPrice();
      Logger.info(`Item: ${item.name}`);
      Logger.info(`Type: ${item.type}`);
      //.toFixed() method is used to format the number to a fixed numberof decimal places.
      Logger.info(`Price: ${item.price.toFixed(2)}`);
      Logger.info(`Sales Tax: ${tax.toFixed(2)}`);
      Logger.info(`Final Price: ${finalPrice.toFixed(2)}\n`);
    }
  }
}
