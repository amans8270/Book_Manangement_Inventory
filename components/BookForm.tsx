"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "@/lib/validator";
import ErrorToast from "./ErrorToast";

export default function BookForm({
  refresh,
  close,
}: {
  refresh: Function;
  close: () => void;
}) {
  const [toastErrors, setToastErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: any) => {
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await fetch("/api/books");
    refresh(await res.json());
    reset();
    close();
  };

  const onError = (formErrors: any) => {
    const messages = Object.values(formErrors).map(
      (err: any) => err.message || "Invalid value"
    );
    setToastErrors(messages);
  };
const inputClass = (field: keyof typeof errors) =>
  `border p-2 w-full rounded text-gray-900 bg-white placeholder-gray-400 ${
    errors[field]
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300"
  }`;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-3">
        <input
          {...register("title")}
          placeholder="Title"
          className={inputClass("title")}
        />

        <input
          {...register("author")}
          placeholder="Author"
          className={inputClass("author")}
        />

        <input
          {...register("email")}
          placeholder="Email"
          className={inputClass("email")}
        />

        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="Age"
          className={inputClass("age")}
        />

        <input
          {...register("publisher")}
          placeholder="Publisher"
          className={inputClass("publisher")}
        />

        <input
          type="date"
          {...register("publishedDate")}
          className={inputClass("publishedDate")}
        />

        <textarea
          {...register("description")}
          placeholder="Description"
          className={inputClass("description")}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      {toastErrors.length > 0 && (
        <ErrorToast
          errors={toastErrors}
          onClose={() => setToastErrors([])}
        />
      )}
    </>
  );
}
