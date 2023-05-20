import { Video } from "../models/video.model";
import axios from "axios";
import settings from "./../config/settings";

export const getVideoById = async (videoId: string): Promise<Video> => {
  const video = await axios.get<Video>(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${settings.API_KEY_YOUTUBE}&part=snippet`
  );

  return video.data;
};
