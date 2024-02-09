import fs from "fs";
import path from "path";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/game", gameRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/vehicles", vehicleRoutes);

const __dirname = path.resolve();
export const FILE_PATH = path.join(__dirname, "/data/db.json");
export const gameInfo = new Map();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res, next) => {
    res.send("API is running.");
  });
}

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const getDB = () => {
  const rawData = fs.readFileSync(FILE_PATH);
  return JSON.parse(rawData);
};

export const writeToDB = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};
