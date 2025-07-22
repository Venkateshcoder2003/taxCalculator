//This is the interface that defines a common structure for all items.
//Each item is able to calculate its tax and final price
//Interface is basically defines a common structure or behaviour that multipla objects follow.

export interface Item {
  name: string;
  price: number;
  quantity: number;
  type: string;

  calculateTax(): number;
  getFinalPrice(): number;
}
