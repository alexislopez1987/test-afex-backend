import express from "express";
import { getYoutubeVideoById } from "../controllers/youtube.controller";

const indexRouter = express.Router();

indexRouter.get("/youtube-video/:videoId", getYoutubeVideoById);

export default indexRouter;
