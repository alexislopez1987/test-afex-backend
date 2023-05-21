import { Video } from "../models/video.model";
import axios from "axios";
import settings from "./../config/settings";
import { StatusCodes } from "http-status-codes";
import { VideoAlbum } from "../models/video-album.model";
import { pool } from "../config/pools";

const table = "dbo.video_album";

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

  return videos.rows;
};

export const getVideoByIdRepo = async (
  videoId: string
): Promise<VideoAlbum | undefined> => {
  const videos = await pool.query<VideoAlbum>(
    `SELECT * FROM ${table} WHERE video_id = $1`,
    [videoId]
  );

  return videos.rows[0];
};

export const createVideoRepo = async (newVideo: VideoAlbum): Promise<void> => {
  const query = `
        INSERT INTO ${table} (video_id, description, url, thumbnail_default, thumbnail_medium, thumbnail_high, thumbnail_standard, thumbnail_maxres)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING video_id, description, url, thumbnail_default, thumbnail_medium, thumbnail_high, thumbnail_standard, thumbnail_maxres
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
    ]);
  } catch (error) {
    const errMsg = "error al insertar video en album";
    console.error(errMsg, error);
    throw new Error(errMsg);
  }
};

export const deleteVideoByIdRepo = async (videoId: string): Promise<void> => {
  await pool.query(`DELETE FROM ${table} WHERE video_id = $1`, [videoId]);
};
