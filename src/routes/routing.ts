import express from "express";
import { getMessages } from "../controllers/message.controller";

const indexRouter = express.Router();

indexRouter.get("/messages", getMessages);

export default indexRouter;
