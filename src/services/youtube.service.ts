import { VideoAlbum } from "../models/video-album.model";
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
): Promise<VideoAlbum | undefined> => {
  const video = await getVideoByIdRepo(videoId);

  return video;
};

export const createVideoService = async (videoId: string): Promise<void> => {
  const youtubeVideo = await getYoutubeVideoByIdRepo(videoId);
  const validateVideoAlreadySaved = await getVideoByIdRepo(videoId);

  if (!validateVideoAlreadySaved) {
    throw new Error(`Video con id ${videoId} ya esta guardado en album`);
  }

  const newVideoAlbum: VideoAlbum = {
    video_id: videoId,
    description: youtubeVideo.items[0].snippet.description,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnail_default: youtubeVideo.items[0].snippet.thumbnails.default.url,
    thumbnail_medium: youtubeVideo.items[0].snippet.thumbnails.medium.url,
    thumbnail_high: youtubeVideo.items[0].snippet.thumbnails.high.url,
    thumbnail_standard: youtubeVideo.items[0].snippet.thumbnails.standard.url,
    thumbnail_maxres: youtubeVideo.items[0].snippet.thumbnails.maxres.url,
  };

  await createVideoRepo(newVideoAlbum);
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
