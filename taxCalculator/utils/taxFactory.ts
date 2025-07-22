//import all items
//This taxFactory.ts is a main factory class for creating instances of required type based on user input
//in this way reducing tight-coupling

import { importedItem } from "../src/models/importedItem";
import { manufacturedItem } from "../src/models/manufacturedItem";
import { rawItem } from "../src/models/rawItem";


export class taxFactory
{
    static createItem ( name: string, price: number, quantity: number, type: string )
    {
        let lowerType = type.toLocaleLowerCase();

        if ( lowerType == "raw" )
        {
            return new rawItem( name, price, quantity, type );
        }
        else if ( lowerType == "manufactured" )
        {
            return new manufacturedItem( name, price, quantity, type );
        }
        else if ( lowerType == "imported" )
        {
            return new importedItem( name, price, quantity, type );
        }
        else
        {
            throw new Error( "Invalid item type: " + type );
        }
    }
}