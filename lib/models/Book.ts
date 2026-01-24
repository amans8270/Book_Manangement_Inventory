import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: String,
    author: String,
    email: String,
    age: Number,
    publisher: String,
    publishedDate: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);
