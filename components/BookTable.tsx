"use client";

import Link from "next/link";
import { Book } from "@/lib/types";

export default function BookTable({
  books,
  refresh,
}: {
  books: Book[];
  refresh: () => void;
}) {
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete book");
      return;
    }

    refresh();
  };

  if (books.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No books available
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
         <tr className="border-t hover:bg-gray-50 text-gray-800">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Publisher</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.id}
              className={`border-t hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="p-3 font-medium">{book.title}</td>
              <td className="p-3">{book.author}</td>
              <td className="p-3">{book.publisher}</td>
              <td className="p-3 text-right space-x-3">
                <Link
                  href={`/books/${book.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
