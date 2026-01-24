import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  author: z.string().min(2, "Author name is required"),
  email: z.string().email("Please enter a valid email"),
  age: z.number().int("Age must be an integer").positive("Age must be positive"),
  publisher: z.string().min(2, "Publisher is required"),
  publishedDate: z.string(),
  description: z.string().min(5, "Description is too short"),
});
