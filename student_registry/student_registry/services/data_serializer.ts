//Import required modules
import * as fs from "fs";
import * as path from "path";
import { User } from "../models/user"; //Import the user interface/model
import { Logger } from "../utils/logger"; //Import logging utility for logging messages

//Dataserializer is a singleton class that is used to save and load data from a JSON file
export class DataSerializer {
  private static instance: DataSerializer; //Singleton instance
  private filePath = "./data/user_data.json"; //Path where data is stored

  //Private constructor to prevent direct object creation
  private constructor() {}

  //Returns a singleton instance of Dataserializer
  static getInstance(): DataSerializer {
    if (!DataSerializer.instance) {
      DataSerializer.instance = new DataSerializer();
    }
    return DataSerializer.instance;
  }

  //saves data to disk
  saveDataToDisk(users: User[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), "utf-8");
    } catch (error) {
      Logger.error(`Failed to save data: ${error}`);
    }
  }

  //Load data from disk
  loadDataFromDisk(): User[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, "utf-8");
      if (!data.trim()) return [];
      return JSON.parse(data);
    } catch (error) {
      Logger.error(`Failed to load data: ${error}`);
      return [];
    }
  }
}
