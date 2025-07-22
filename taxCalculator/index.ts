//this is the place where we take input from user parse it and create the respective items
import * as readline from "readline";
import { taxFactory } from "./utils/taxFactory";//Factory that creates items
import { InputParser } from "./utils/inputParser";
import { ItemManager } from "./utils/itemManager";


//creating the interface for reading the inputs from user
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
} );

const manager = new ItemManager();
const inputParser = new InputParser();
function takeUserInput ()
{
    rl.question( "\nDo you want to enter te details(y/n): ", ( answer ) =>
    {
        if ( answer.toLocaleLowerCase() === "y" )
        {
            rl.question( "Enter args like: -name \"Soap\" -price 20 -quantity 2 -type raw\n: ", ( userInput ) =>
            {
                const argument = [ "node", "app.ts", ...userInput.trim().split( " " ) ];
                try
                {
                    const parsedArguments = inputParser.parseArguments( argument );
                    const item = taxFactory.createItem( parsedArguments.name, parsedArguments.price, parsedArguments.quantity, parsedArguments.type );
                    manager.addItem( item );
                    takeUserInput();
                } catch ( err: any )
                {
                    console.log( err.message );
                    takeUserInput();
                }
            } )
        } else
        {
            manager.printItems();
            rl.close();
        }
    } );
}

takeUserInput();