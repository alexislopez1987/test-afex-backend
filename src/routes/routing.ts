import express from "express";
import {
  getYoutubeVideoById,
  createVideo,
  getAllVideos,
  deleteVideoById,
} from "../controllers/youtube.controller";

const indexRouter = express.Router();

//indexRouter.get("/youtube-video/:videoId", getYoutubeVideoById);
indexRouter.get("/youtube-videos", getAllVideos);
indexRouter.post("/create-video", createVideo);
indexRouter.delete("/youtube-video/:videoId", deleteVideoById);

export default indexRouter;
