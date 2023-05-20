const settings = {
  PORT: parseInt(process.env.PORT?.toString() ?? "8096", 10),
  API_KEY_YOUTUBE: process.env.API_KEY_YOUTUBE ?? "",
};

export default settings;
