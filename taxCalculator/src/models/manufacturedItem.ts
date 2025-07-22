import { Item } from "./item";


export class manufacturedItem implements Item
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
        let basic = this.price * 0.125;
        return basic + 0.02 * ( this.price + basic );
    }
    getFinalPrice (): number
    {
        return this.price + this.calculateTax();
    }
}