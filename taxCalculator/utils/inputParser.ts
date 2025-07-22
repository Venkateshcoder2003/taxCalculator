//all user input should be of type parsedInput
export interface parsedInput
{
    name: string;
    price: number;
    quantity: number;
    type: string;
}

export class InputParser
{
    parseArguments ( args: string[] ): parsedInput
    {
        const input: any = {}; // creating an input object to store the parsedarguments
        for ( let i = 2; i < args.length; i += 2 )
        {
            const key = args[ i ];
            const value = args[ i + 1 ];

            //Validating user input 
            if ( !value || value.startsWith( "-" ) )
            {
                throw new Error( `Missing Value for Argument: ${ key }` );
            }
            switch ( key )
            {
                case "-name":
                    input.name = value;
                    break;
                case "-price":
                    input.price = parseFloat( value );
                    break;
                case "-quantity":
                    input.quantity = parseInt( value );
                    break;
                case "-type":
                    input.type = value;
                    break;
                default:
                    throw new Error( `Unknown Argument Entered: ${ key }` );
            }
        }
        if ( !input.name || !input.price || !input.quantity || !input.type )
        {
            throw new Error( "Missing Some Arguments" );
        }

        return input as parsedInput;
    }
};