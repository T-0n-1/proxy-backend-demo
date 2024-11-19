import express, { Express, Request. Response } from "express";
import dotenv from "dotenv";
import { backendWhitelist, isOriginAllowed, setHeaders } from "./Functions";
import backendRouter from "./routes/backendAPI";
import Joi from "joi";

dotenv.config();

const app: Express = express();
const port = Number(process.env.BACKPORT) || 3000;

// CORS middleware
app.use((req: Request, res: Response, next) => {
    const origin: string = req.headers.origin || "";
    if (isOriginAllowed(origin, backendWhitelist)) {
      setHeaders(res, origin);
    }
    next();
  });

app.use("/api", backendRouter);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    const schema = Joi.object().unknown(false);
    const { error } = schema.validate(req.query);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
    res.send("Connection to the backend server working");
    }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
