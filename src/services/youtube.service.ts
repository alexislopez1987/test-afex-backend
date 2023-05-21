import { Video } from "../models/video.model";
import {
  createVideoRepo,
  deleteVideoByIdRepo,
  getAllVideosRepo,
  getVideoByIdRepo,
  getYoutubeVideoByIdRepo,
} from "../repository/youtube.repository";

export const getAllVideosService = async () => {
  const videos = await getAllVideosRepo();

  return videos;
};

export const getVideoByIdService = async (
  videoId: string
): Promise<Video | undefined> => {
  const video = await getVideoByIdRepo(videoId);

  return video;
};

export const createVideoService = async (videoId: string): Promise<void> => {
  const youtubeVideo = await getYoutubeVideoByIdRepo(videoId);
  const validateVideoAlreadySaved = await getVideoByIdRepo(videoId);

  if (!validateVideoAlreadySaved) {
    throw new Error(`Video con id ${videoId} ya esta guardado en album`);
  }

  await createVideoRepo(youtubeVideo);
};

export const deleteVideoByIdService = async (
  videoId: string
): Promise<void> => {
  await deleteVideoByIdRepo(videoId);
};

export const getYoutubeVideoByIdService = async (
  videoId: string
): Promise<Video> => {
  const video = await getYoutubeVideoByIdRepo(videoId);

  return video;
};
