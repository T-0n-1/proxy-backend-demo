import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { fileOperations, undefinedStudent } from "../Functions";
import type { Student } from "../Interfaces";

const router: Router = express.Router();
dotenv.config();
const data = fileOperations();

router.get("/students", (req: Request, res: Response) => {
  const schema = Joi.object().unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (typeof data !== "undefined") {
      res.json(
        typeof data === "string"
          ? JSON.parse(data)
          : JSON.parse(data.toString()),
      );
    }
  }
});

router.get("/students/:id", (req: Request, res: Response) => {
  const querySchema = Joi.object({
    id: Joi.number().required().min(1).max(10),
  }).unknown(false);
  const { value, error } = querySchema.validate(req.params);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (Array.isArray(data)) {
      if (!data.find((c) => Number(c.id) === Number(value.id))) {
        res.status(404).json(undefinedStudent);
      } else {
        res.json(data.find((student) => student.id === Number(value.id)));
      }
    }
  }
});

export default router;
