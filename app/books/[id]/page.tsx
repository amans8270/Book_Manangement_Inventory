"use client";

import { useEffect, useState } from "react";
import { Book } from "@/lib/types";

export default function BookDetails({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      const { id } = await params;
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setBook(data);
    };

    loadBook();
  }, [params]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Email:</b> {book.email}</p>
      <p><b>Age:</b> {book.age}</p>
      <p><b>Publisher:</b> {book.publisher}</p>
      <p><b>Published:</b> {book.publishedDate}</p>
      <p className="mt-2">{book.description}</p>
    </div>
  );
}
