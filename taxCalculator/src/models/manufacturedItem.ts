import { Item } from "./item";
//Class representing a manufacturedItem that implements Item iterface.
export class manufacturedItem implements Item {
  public name: string;
  public price: number;
  public quantity: number;
  public type: string;

  //constructor that initializes the name, price, quantity and type of the manufacturedItem.
  constructor(name: string, price: number, quantity: number, type: string) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }
  // Calculating the tax for manufacturedItem: 12.5% basic + 2% of (price + basic)
  calculateTax(): number {
    let basic = this.price * 0.125;
    return basic + 0.02 * (this.price + basic);
  }
  // Final price = base price + total tax
  getFinalPrice(): number {
    return this.price + this.calculateTax();
  }
}
