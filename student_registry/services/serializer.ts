import * as fs from "fs";
import * as path from "path";
import { User } from "../models/user";

const FILEPATH = "./data/user_data.json";

export class Serializer {
  saveDataToDisk(users: User[]): void {
    fs.writeFileSync(FILEPATH, JSON.stringify(users), "utf-8");
  }

  loadDataFromDisk(): User[] {
    const data = fs.readFileSync(FILEPATH, "utf-8");
    if (!data) return [];
    return JSON.parse(data);
  }
}
