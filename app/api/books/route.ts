import { NextResponse } from "next/server";
import { readBooks, writeBooks } from "@/lib/jsonDb";
import { Book } from "@/lib/types";

export async function GET() {
  const books = readBooks();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  const books = readBooks();

  const newBook: Book = {
    id: Date.now().toString(),
    ...body,
  };

  books.push(newBook);
  writeBooks(books);

  return NextResponse.json(newBook, { status: 201 });
}
