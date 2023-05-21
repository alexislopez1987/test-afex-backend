import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
  getVideoById,
  createVideoRepo,
  getAllVideosRepo,
  deleteVideoByIdRepo,
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

  try {
    const youtubeVideo = await getVideoById(videoId);
    await createVideoRepo(youtubeVideo);
    res.status(StatusCodes.OK).json({ message: "Video guardado en album" });
  } catch (err) {
    console.error("error guardando video en album", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: `error guardando video en album`,
    });
  }
};

export const deleteVideoById = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const { videoId } = req.params;
  try {
    await deleteVideoByIdRepo(videoId);
    res.status(StatusCodes.OK);
  } catch (err) {
    console.error(`error borrando video en youtube con id ${videoId}`, err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: `error borrando video en youtube con id ${videoId}`,
    });
  }
};
