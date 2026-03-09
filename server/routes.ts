import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existing = await storage.getConcepts();
  if (existing.length > 0) return;

  const initialConcepts = [
    {
      title: "Hello World",
      description: "The classic first program. Use the `print()` function to output text to the screen.",
      codeSnippet: 'print("Hello, World!")',
      output: "Hello, World!",
      difficulty: "beginner" as const,
      category: "fundamentals",
      tags: ["output", "print"],
      estimatedMinutes: 3
    },
    {
      title: "Variables",
      description: "Variables are containers for storing data values. You don't need to declare a type, just assign a value.",
      codeSnippet: 'name = "Alice"\nage = 25\nprint(name, "is", age)',
      output: "Alice is 25",
      difficulty: "beginner" as const,
      category: "fundamentals",
      tags: ["variables", "assignment"],
      estimatedMinutes: 4
    },
    {
      title: "Data Types",
      description: "Python has various data types like integers, floats, strings, and booleans.",
      codeSnippet: 'x = 10\ny = 3.14\nprint(type(x), type(y))',
      output: "<class 'int'> <class 'float'>",
      difficulty: "beginner" as const,
      category: "fundamentals",
      tags: ["types", "integers"],
      estimatedMinutes: 5
    },
    {
      title: "Basic Math",
      description: "Perform addition, subtraction, multiplication, and division operations.",
      codeSnippet: 'a = 15\nb = 4\nprint(a + b, a / b)',
      output: "19 3.75",
      difficulty: "beginner" as const,
      category: "fundamentals",
      tags: ["math", "operators"],
      estimatedMinutes: 4
    },
    {
      title: "Strings",
      description: "Strings are sequences of characters with powerful methods for manipulation.",
      codeSnippet: 'text = "Python"\nprint(text.upper())\nprint(text[0:3])',
      output: "PYTHON\nPyt",
      difficulty: "beginner" as const,
      category: "fundamentals",
      tags: ["strings", "text"],
      estimatedMinutes: 5
    },
    {
      title: "Lists",
      description: "Lists are ordered collections of items accessed by index starting from 0.",
      codeSnippet: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])\nfruits.append("date")\nprint(len(fruits))',
      output: "apple\n4",
      difficulty: "beginner" as const,
      category: "data-structures",
      tags: ["lists", "arrays"],
      estimatedMinutes: 6
    }
  ];

  for (const c of initialConcepts) {
    await storage.createConcept(c);
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
