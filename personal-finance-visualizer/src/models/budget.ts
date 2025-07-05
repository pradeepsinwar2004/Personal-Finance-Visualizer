import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  month: String,           // "2025-07"
  category: String,        // e.g., "Food"
  budget: Number,
}, { timestamps: true });

export const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
