import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import indexRouter from "./routes/routing";
import { StatusCodes } from "http-status-codes";

const createServer = () => {
  const app: Express = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use("/v1", indexRouter);

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: `app_test nodejs 🙂`,
    });
  });

  app.all("*", async (req: Request, res: Response) => {
    res.send({ error: `url no existe` }).status(StatusCodes.NOT_FOUND);
  });

  return app;
};

export default createServer;
