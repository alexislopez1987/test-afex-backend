export interface Video {
  kind: string;
  etag: string;
  items: Items[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface Items {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
}

interface Thumbnails {
  default: DetailThumbnails;
  medium: DetailThumbnails;
  high: DetailThumbnails;
  standard: DetailThumbnails;
  maxres: DetailThumbnails;
}

interface DetailThumbnails {
  url: string;
  width: number;
  height: number;
}
