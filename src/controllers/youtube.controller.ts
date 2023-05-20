import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { getVideoById } from "../repository/youtube.repository";

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
    console.error("error getting youtube video", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messages: `error getting youtube video with id ${videoId}` });
  }
};
