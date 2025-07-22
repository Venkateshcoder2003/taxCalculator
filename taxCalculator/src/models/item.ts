export interface Item
{
    name: string;
    price: number;
    quantity: number;
    type: string;

    calculateTax (): number;
    getFinalPrice (): number;
}

