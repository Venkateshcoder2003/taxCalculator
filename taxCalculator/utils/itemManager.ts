import { Item } from "../src/models/item"

export class ItemManager
{
  //an array of type Item to store and print items
  private items: Item[] = [];

  addItem ( item: Item ): void
  {
    this.items.push( item );
  }

  printItems (): void
  {
    console.log( "\n🧾 Final Bill Summary:\n" );
    for ( const item of this.items )
    {
      const tax = item.calculateTax();
      const finalPrice = item.getFinalPrice();
      console.log( `Item: ${ item.name }` );
      console.log( `Type: ${ item.type }` );
      console.log( `Price: ${ item.price.toFixed( 2 ) }` );
      console.log( `Sales Tax: ${ tax.toFixed( 2 ) }` );
      console.log( `Final Price: ${ finalPrice.toFixed( 2 ) }\n` );
    }
  }
}
