import { Item } from './item';

export class rawItem implements Item
{
    public name: string;
    public price: number;
    public quantity: number;
    public type: string;

    constructor( name: string, price: number, quantity: number, type: string )
    {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }

    calculateTax (): number
    {
        return this.price * 0.12;
    }
    getFinalPrice (): number
    {
        return this.price + this.calculateTax();
    }
}