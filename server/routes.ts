import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

// Seed the database with some initial Python concepts
async function seedDatabase() {
  const existing = await storage.getConcepts();
  if (existing.length === 0) {
    const initialConcepts = [
      {
        title: "Hello World",
        description: "The classic first program. Use the `print()` function to output text to the screen.",
        codeSnippet: 'print("Hello, World!")',
        output: "Hello, World!"
      },
      {
        title: "Variables",
        description: "Variables are containers for storing data values. You don't need to declare a type, just assign a value.",
        codeSnippet: 'name = "Alice"\nage = 25\nprint(name, "is", age)',
        output: "Alice is 25"
      },
      {
        title: "Data Types",
        description: "Python has various data types like integers, floats, strings, and booleans. You can use `type()` to check.",
        codeSnippet: 'x = 10\ny = 3.14\nis_python_fun = True\nprint(type(x), type(y), type(is_python_fun))',
        output: "<class 'int'> <class 'float'> <class 'bool'>"
      },
      {
        title: "Basic Math",
        description: "You can perform addition, subtraction, multiplication, and division easily.",
        codeSnippet: 'a = 15\nb = 4\nprint(a + b)\nprint(a / b)',
        output: "19\n3.75"
      }
    ];

    for (const c of initialConcepts) {
      await storage.createConcept(c);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed data on startup
  seedDatabase().catch(console.error);

  app.get(api.concepts.list.path, async (req, res) => {
    try {
      const concepts = await storage.getConcepts();
      res.status(200).json(concepts);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch concepts" });
    }
  });

  app.get(api.concepts.get.path, async (req, res) => {
    try {
      const concept = await storage.getConcept(req.params.id);
      if (!concept) {
        return res.status(404).json({ message: "Concept not found" });
      }
      res.status(200).json(concept);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch concept" });
    }
  });

  return httpServer;
}
