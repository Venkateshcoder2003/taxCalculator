// This interface defines the common structure for all item types.
// Each item should be able to calculate its tax and final price.
export interface Item {
  name: string;
  price: number;
  quantity: number;
  type: string;

  calculateTax(): number;
  getFinalPrice(): number;
}
