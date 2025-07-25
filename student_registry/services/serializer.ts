//Importing necessary modules
import * as fs from "fs";
import * as path from "path";
import { User } from "../models/user"; // Import User interface.

const FILEPATH = "./data/user_data.json";

export class Serializer {
  //Saving the array of students to disk as JSON.
  saveDataToDisk(users: User[]): void {
    fs.writeFileSync(FILEPATH, JSON.stringify(users), "utf-8");
  }

  //Loading Student details from disk or file and parsing them into objects.
  loadDataFromDisk(): User[] {
    const data = fs.readFileSync(FILEPATH, "utf-8");
    if (!data) return [];
    return JSON.parse(data);
  }
}
