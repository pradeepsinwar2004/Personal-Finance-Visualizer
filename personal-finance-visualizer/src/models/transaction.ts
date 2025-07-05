import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transport",
        "Rent",
        "Shopping",
        "Entertainment",
        "Utilities",
        "Other",
      ],
      default: "Other",
    },
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
