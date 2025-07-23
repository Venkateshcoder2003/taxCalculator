//This interface defines the structure for parsed command-line arguments.
import { Logger } from "./logger";
export interface parsedInput {
  name: string;
  price: number;
  quantity: number;
  type: string;
}
//This class handels parsing of command-line arguments and make it an interface of type parsedInput.
export class InputParser {
  parseArguments(args: string[]): parsedInput {
    const input: any = {}; // creating an input object to store the parsedarguments
    //looping through all arguments and extracting the key-value pairs.
    for (let i = 2; i < args.length; i += 2) {
      const key = args[i];
      const value = args[i + 1];

      //Validating user input: value should not be mising or look like other flags it need to start with "-".
      if (!value || value.startsWith("-")) {
        //if input validation fails we need to throw an error.
        throw new Error(`Missing Value for Argument: ${key}`);
      }

      //mapping of CLI flags to input object fields using switch.
      switch (key) {
        case "-name":
          input.name = value;
          break;
        case "-price":
          input.price = parseFloat(value);
          break;
        case "-quantity":
          input.quantity = parseInt(value);
          break;
        case "-type":
          input.type = value;
          break;
        default:
          Logger.error(`Unknown Argument Entered: ${key}`);
      }
    }
    //Explicitly checking whether user entered all required fields or not.
    if (!input.type) {
      Logger.error(
        `Missing Type: Type is required for product "${
          input.name || "Unknown"
        }"`
      );
    }
    //now we are returning the input object as parsedInput type.
    return input as parsedInput;
  }
}
