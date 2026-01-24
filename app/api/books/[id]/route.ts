import { NextResponse } from "next/server";
import { readBooks, writeBooks } from "@/lib/jsonDb";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const books = readBooks();

  const book = books.find(b => b.id === id);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const books = readBooks();

  const filtered = books.filter(b => b.id !== id);

  if (filtered.length === books.length) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  writeBooks(filtered);
  return NextResponse.json({ message: "Book deleted" });
}
