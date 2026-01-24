import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/lib/models/Book";

export async function GET() {
  await connectDB();
  const books = await Book.find().sort({ createdAt: -1 });
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const newBook = await Book.create(body);
  return NextResponse.json(newBook, { status: 201 });
}
