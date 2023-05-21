import { Video } from "../models/video.model";
import axios from "axios";
import settings from "./../config/settings";
import { StatusCodes } from "http-status-codes";

export const getVideoById = async (videoId: string): Promise<Video> => {
  const video = await axios.get<Video>(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${settings.API_KEY_YOUTUBE}&part=snippet`
  );

  if (video.status === StatusCodes.NOT_FOUND) {
    throw new Error(`Video con id ${videoId} no fue encontrado`);
  }

  return video.data;
};

export const getAllVideosRepo = async () => {
  //TODO: obtener videos en BD
  const videos = new Promise<Video[]>(function (resolve, reject) {
    resolve([]);
  });

  return videos;
};

export const createVideoRepo = async (): Promise<void> => {
  //TODO: guarda video en BD
};