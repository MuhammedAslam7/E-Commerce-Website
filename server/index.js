import express, { urlencoded } from "express";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { router } from "./routes/route.js";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(logger("dev"));
app.use;
app.use(express.json());
app.use(urlencoded({ extended: true }));
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
