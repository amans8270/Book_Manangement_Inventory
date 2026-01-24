import fs from "fs";
import path from "path";
import { Book } from "./types";

const filePath = path.join(process.cwd(), "data", "books.json");

export function readBooks(): Book[] {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function writeBooks(books: Book[]) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}
