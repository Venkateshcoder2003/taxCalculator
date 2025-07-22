import { Item } from "../src/models/item";
//Itemmanager responsible for storing and printing the items entered by the user.

export class ItemManager {
  //array to hold multiple Item instances.
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  printItems(): void {
    console.log("\n🧾 Final Bill Summary:\n");
    for (const item of this.items) {
      //calculating the tax and final price for each item.
      const tax = item.calculateTax();
      const finalPrice = item.getFinalPrice();
      console.log(`Item: ${item.name}`);
      console.log(`Type: ${item.type}`);
      //.toFixed() method is used to format the number to a fixed numberof decimal places.
      console.log(`Price: ${item.price.toFixed(2)}`);
      console.log(`Sales Tax: ${tax.toFixed(2)}`);
      console.log(`Final Price: ${finalPrice.toFixed(2)}\n`);
    }
  }
}
