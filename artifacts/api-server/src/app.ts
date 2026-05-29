import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { logger } from "./lib/logger";

const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info({ method: req.method, url: req.url?.split("?")[0] });
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import router from "./routes";
app.use("/api", router);

export default app;