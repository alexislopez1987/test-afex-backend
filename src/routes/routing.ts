import express from "express";
import {
  getYoutubeVideoById,
  createVideo,
  getAllVideos,
} from "../controllers/youtube.controller";

const indexRouter = express.Router();

indexRouter.get("/youtube-video/:videoId", getYoutubeVideoById);
indexRouter.post("/create-video", createVideo);
indexRouter.get("/youtube-videos", getAllVideos);

export default indexRouter;
