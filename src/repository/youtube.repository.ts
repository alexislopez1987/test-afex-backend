import { Video } from "../models/video.model";
import axios from "axios";
import settings from "./../config/settings";
import { StatusCodes } from "http-status-codes";
import { VideoAlbum } from "../models/video-album.model";
import { pool } from "../config/pools";

const table = "public.video_album";

export const getYoutubeVideoByIdRepo = async (
  videoId: string
): Promise<Video> => {
  const video = await axios.get<Video>(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${settings.API_KEY_YOUTUBE}&part=snippet`
  );

  if (video.status === StatusCodes.NOT_FOUND) {
    throw new Error(`Video con id ${videoId} no fue encontrado en youtube`);
  }

  return video.data;
};

export const getAllVideosRepo = async () => {
  const videos = await pool.query<VideoAlbum>(`SELECT * FROM ${table}`);

  if (videos.rowCount === 0) {
    return [];
  }

  return videos.rows;
};

export const getVideoByIdRepo = async (
  videoId: string
): Promise<VideoAlbum | undefined> => {
  const video = await pool.query(`SELECT * FROM ${table} WHERE video_id = $1`, [
    videoId,
  ]);

  if (video.rowCount === 0) {
    return undefined;
  } else {
    return video.rows[0];
  }
};

export const createVideoRepo = async (newVideo: VideoAlbum): Promise<void> => {
  const query = `
        INSERT INTO ${table} (video_id, description, url, thumbnail_default, thumbnail_medium, thumbnail_high, thumbnail_standard, thumbnail_maxres, duration)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING video_id, description, url, thumbnail_default, thumbnail_medium, thumbnail_high, thumbnail_standard, thumbnail_maxres, duration
    `;

  const {
    video_id,
    description,
    url,
    thumbnail_default,
    thumbnail_medium,
    thumbnail_high,
    thumbnail_standard,
    thumbnail_maxres,
    duration,
  } = newVideo;

  try {
    pool.query(query, [
      video_id,
      description,
      url,
      thumbnail_default,
      thumbnail_medium,
      thumbnail_high,
      thumbnail_standard,
      thumbnail_maxres,
      duration,
    ]);
  } catch (error) {
    const errMsg = "error al insertar video en album";
    console.error(errMsg, error);
    throw new Error(errMsg);
  }
};

export const deleteVideoByIdRepo = async (videoId: string): Promise<void> => {
  try {
    await pool.query(`DELETE FROM ${table} WHERE video_id = $1`, [videoId]);
  } catch (error) {
    const errMsg = "error al borrar video en album";
    console.error(errMsg, error);
    throw new Error(errMsg);
  }
};
