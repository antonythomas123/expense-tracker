import { sql } from "../config/db.js";

export const getTransactionByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactionSummaryByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const balance =
      await sql`SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId}`;

    const income =
      await sql`SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
    const expense =
      await sql`SELECT COALESCE(SUM(amount), 0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    res.status(200).json({
      balance: balance[0]?.balance,
      income: income[0]?.income,
      expense: expense[0]?.expenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addTransactions = async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction =
      await sql`INSERT INTO transactions(user_id, title, amount, category) 
    VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;

    res.status(201).json(transaction[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    return res.status(200).json({ message: "Transaction deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
