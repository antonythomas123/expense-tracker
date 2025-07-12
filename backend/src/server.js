import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactions.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.APP_PORT || 5001;

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
