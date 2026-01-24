"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/lib/types";

export default function BookDetails({
  params,
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

  if (!book) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-lg shadow p-6">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-block mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Book Inventory
      </Link>

      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Email:</strong> {book.email}</p>
        <p><strong>Age:</strong> {book.age}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Published Date:</strong> {book.publishedDate}</p>
      </div>

      <p className="mt-4">{book.description}</p>
    </div>
  );
}
