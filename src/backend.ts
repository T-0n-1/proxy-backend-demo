import express, { Express } from "express";
import path from "path";
import { PathOrFileDescriptor }, fs from "fs";
import dotenv from "dotenv";
import type { Student } from "./Interfaces";

dotenv.config();

const app: Express = express();
const port = Number(process.env.BACKPORT) || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
