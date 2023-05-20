require("dotenv").config();
import createServer from "./server";
import settings from "./config/settings";

const port = settings.PORT;

const app = createServer();

app.listen(port, () => {
  console.log(`servidor 👂 en puerto: ${port}`);
});
