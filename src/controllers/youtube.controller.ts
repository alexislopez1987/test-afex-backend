import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
  getVideoById,
  createVideoRepo,
  getAllVideosRepo,
} from "../repository/youtube.repository";

interface ReqParams {
  videoId: string;
}

export const getYoutubeVideoById = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const { videoId } = req.params;
  try {
    const data = await getVideoById(videoId);
    res.status(StatusCodes.OK).json({ message: data });
  } catch (err) {
    console.error("error obteniendo video en youtube", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: `error obteniendo video en youtube con id ${videoId}`,
    });
  }
};

export const getAllVideos = async (
  req: Request<{}, {}, {}, {}>,
  res: Response
) => {
  try {
    const data = await getAllVideosRepo();
    res.status(StatusCodes.OK).json({ message: data });
  } catch (err) {
    console.error("error obteniendo videos", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: `error obteniendo videos`,
    });
  }
};

export const createVideo = async (
  req: Request<{}, {}, ReqParams, {}>,
  res: Response
) => {
  const { videoId } = req.body;
  const youtubeVideo = await getVideoById(videoId);

  try {
    if (youtubeVideo) {
      await createVideoRepo();
      res.status(StatusCodes.OK).json({ message: "Video guardado en album" });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        messages: `error obteniendo video en youtube con id  ${videoId}`,
      });
    }
  } catch (err) {
    console.error("error guardando video en album", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: `error guardando video en album`,
    });
  }
};
