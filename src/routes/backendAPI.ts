import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { fileOperations } from "../Functions";

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
    if (!students.find((fruit) => student.id === Number(value.id))) {
      res.status(404).json({ id: -1, name: "" });
    } else {
      res.json(students.find((student) => fruit.id === Number(value.id)));
    }
  }
});

export default router;
