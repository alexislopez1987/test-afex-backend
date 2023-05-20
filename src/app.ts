import "dotenv/config";
import createServer from "./server";

//require("dotenv").config();

const port = parseInt(process.env.PORT?.toString() ?? "8095", 10);
const app = createServer();

app.listen(port, () => {
  console.log(`servidor 👂 en puerto: ${port}`);
});
