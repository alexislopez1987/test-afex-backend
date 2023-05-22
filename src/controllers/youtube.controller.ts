import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
  createVideoService,
  deleteVideoByIdService,
  getAllVideosService,
  getYoutubeVideoByIdService,
} from "../services/youtube.service";
import { getVideoByIdRepo } from "../repository/youtube.repository";

interface ReqParams {
  videoId: string;
}

export const getYoutubeVideoById = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const { videoId } = req.params;
  try {
    const data = await getYoutubeVideoByIdService(videoId);
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    console.error("error obteniendo video en youtube", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(`error obteniendo video en youtube con id ${videoId}`);
  }
};

export const getAllVideos = async (
  req: Request<{}, {}, {}, {}>,
  res: Response
) => {
  try {
    const data = await getAllVideosService();
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    console.error("error obteniendo videos", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(`error obteniendo videos`);
  }
};

export const createVideo = async (
  req: Request<{}, {}, ReqParams, {}>,
  res: Response
) => {
  const { videoId } = req.body;

  try {
    const validateVideoAlreadySaved = await getVideoByIdRepo(videoId);

    if (validateVideoAlreadySaved !== undefined) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(`Video con id ${videoId} ya esta guardado en album`);
    } else {
      console.log("aca", validateVideoAlreadySaved);
      await createVideoService(videoId);
      res.status(StatusCodes.OK).json("Video guardado en album");
    }
  } catch (err) {
    console.error("error guardando video en album", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(`error guardando video en album`);
  }
};

export const deleteVideoById = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const { videoId } = req.params;
  try {
    await deleteVideoByIdService(videoId);
    res
      .status(StatusCodes.OK)
      .json(`video con id ${videoId} borrado exitosamente`);
  } catch (err) {
    console.error(`error borrando video en youtube con id ${videoId}`, err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(`error borrando video en youtube con id ${videoId}`);
  }
};
