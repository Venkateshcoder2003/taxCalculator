
** TAX Calculator **
taxCalculator/
├── src/
│ ├── models/ # Item types: Raw, Manufactured, Imported
│ ├── utils/ # Tax Factory and Input Parser
│ └── index.ts # Entry point

## Features
- Dynamically creates item types using the Factory Design Pattern.
- Calculates tax based on item type:
   - Raw
   - Imported
   - Manufactured
 
##  How to Run
  `Run these in command line`
  # Install typescript
    npm install -g typescript
  # Install dependencies
    npm install
  # compile index.js
    tsc index.ts
  # Run the file 
    node index.js
