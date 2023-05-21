CREATE TABLE video_album (
	video_id VARCHAR ( 250 ) PRIMARY KEY,
	description VARCHAR ( 2000 ) NOT NULL,
    url VARCHAR ( 250 ) NOT NULL,
	thumbnail_default VARCHAR ( 250 ) NOT NULL,
	thumbnail_medium VARCHAR ( 250 ) NOT NULL,
	thumbnail_high VARCHAR ( 250 ) NOT NULL,
    thumbnail_standard VARCHAR ( 250 ) NOT NULL,
    thumbnail_maxres VARCHAR ( 250 ) NOT NULL
);