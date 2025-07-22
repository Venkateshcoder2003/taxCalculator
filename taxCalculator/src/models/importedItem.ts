import { Item } from "./item";

export class importedItem implements Item
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
        let importDutyCost = 0.1 * this.price;
        let finalCost = importDutyCost + this.price;

        let surCharge = 0;
        if ( finalCost <= 100 ) surCharge = 5;
        else if ( finalCost <= 200 ) surCharge = 10;
        else surCharge = finalCost * 0.05;

        return importDutyCost + surCharge;
    }
    getFinalPrice (): number
    {
        return this.price + this.calculateTax();
    }
}