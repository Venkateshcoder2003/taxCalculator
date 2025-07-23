import { Item } from "./item";

// Class representing an Imported Item.
// Implements the Item interface and provides tax calculation specific to imported Item.
export class importedItem implements Item {
  public name: string;
  public price: number;
  public quantity: number;
  public type: string;

  //constructor that initializes the name, price, quantity and type of the importedItem.
  constructor(name: string, price: number, quantity: number, type: string) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }

  //tax for this item is basically calculated as the sum of import duty and surcharge
  //importduty tax=10 % of item price
  //surcharge
  // Surcharge:
  //  Rs.5 if final cost <= 100
  //  Rs.10 if final cost <= 200
  //  5% of final cost if > 200
  calculateTax(): number {
    let importDutyCost = 0.1 * this.price;
    let finalCost = importDutyCost + this.price;

    let surCharge = 0;
    if (finalCost <= 100) surCharge = 5;
    else if (finalCost <= 200) surCharge = 10;
    else surCharge = finalCost * 0.05;

    return importDutyCost + surCharge;
  }

  // Final price = base price + total import tax
  getFinalPrice(): number {
    return this.price + this.calculateTax();
  }
}
