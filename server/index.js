import express from "express";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { router } from "./routes/route.js";
import cors from "cors";
import logger from "morgan";
const port = process.env.PORT;
const app = express();
app.use(logger("dev"));
app.use;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", router);

(async function startServer() {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
})();
