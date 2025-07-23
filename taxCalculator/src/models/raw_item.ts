import { Item } from "./item";
// Class representing a Raw Item.
// Implements the Item interface and provides tax calculation specific to raw Item.
export class rawItem implements Item {
  public name: string;
  public price: number;
  public quantity: number;
  public type: string;
  //constructor that initializes the name, price, quantity and type of the rawItem.
  constructor(name: string, price: number, quantity: number, type: string) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }
  //a simple function to claculate the tax of the rawItem.
  //tax =12% of the base price
  calculateTax(): number {
    return this.price * 0.12;
  }
  // Final price = base price + tax
  getFinalPrice(): number {
    return this.price + this.calculateTax();
  }
}
