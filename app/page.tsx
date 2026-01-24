"use client";

import { useEffect, useState } from "react";
import { Book } from "@/lib/types";
import BookTable from "@/components/BookTable";
import BookForm from "@/components/BookForm";
import Modal from "@/components/Modal";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);

  const loadBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Book Inventory</h1>
          <p className="text-gray-500 text-sm">
            Manage your books efficiently
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Book
        </button>
      </div>

      <BookTable books={books} refresh={loadBooks} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
        <BookForm refresh={loadBooks} close={() => setOpen(false)} />
      </Modal>
    </>
  );
}
