import fs from "fs/promises";
import path from "path";
import { type Concept, type InsertConcept } from "@shared/schema";
import { randomUUID } from "crypto";

const DB_PATH = path.join(process.cwd(), "DATABASE.json");

export interface IStorage {
  getConcepts(): Promise<Concept[]>;
  getConcept(id: string): Promise<Concept | undefined>;
  createConcept(concept: InsertConcept): Promise<Concept>;
}

export class JsonStorage implements IStorage {
  private async readData(): Promise<Concept[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(DB_PATH, "[]", "utf-8");
        return [];
      }
      throw error;
    }
  }

  private async writeData(data: Concept[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  async getConcepts(): Promise<Concept[]> {
    return await this.readData();
  }

  async getConcept(id: string): Promise<Concept | undefined> {
    const concepts = await this.readData();
    return concepts.find((c) => c.id === id);
  }

  async createConcept(insertConcept: InsertConcept): Promise<Concept> {
    const concepts = await this.readData();
    const newConcept: Concept = { ...insertConcept, id: randomUUID() };
    concepts.push(newConcept);
    await this.writeData(concepts);
    return newConcept;
  }
}

export const storage = new JsonStorage();
