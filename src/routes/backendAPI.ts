import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { undefinedStudent } from "../Functions";
import path from "path";
import fs, { PathOrFileDescriptor } from "fs";
import type { Student } from "../Interfaces";

const router: Router = express.Router();
dotenv.config();
const pathToFile: string = process.env.DATAFILEPATH || "";

router.get("/students", (req: Request, res: Response) => {
  const schema = Joi.object().unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (pathToFile === "") {
      res.status(500).send(undefinedStudent);
      return;
    }
    const pathDescriptor: PathOrFileDescriptor = path.resolve(pathToFile);
    fs.readFile(
      pathDescriptor,
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string | Buffer) => {
        if (err) {
          res.status(500).send(undefinedStudent);
          return;
        }
        res.json(
          typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString()),
        );
      },
    );
  }
});

router.get("/students/:id", (req: Request, res: Response) => {
  const querySchema = Joi.object({
    id: Joi.number().required().min(1).max(9999),
  }).unknown(false);
  const { value, error } = querySchema.validate(req.params);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (pathToFile === "") {
      res.status(500).send(undefinedStudent);
      return;
    }
    const pathDescriptor: PathOrFileDescriptor = path.resolve(pathToFile);
    fs.readFile(
      pathDescriptor,
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string | Buffer) => {
        if (err) {
          res.status(500).send(undefinedStudent);
          return;
        }
        let students: Student[];
        if (typeof data === "string") {
          students = JSON.parse(data);
        } else {
          students = JSON.parse(data.toString());
        }
        if (!students.find((student) => student.id === Number(value.id))) {
          res.status(404).json(undefinedStudent);
        } else {
          res.json(students.find((student) => student.id === Number(value.id)));
        }
      },
    );
  }
});

export default router;
