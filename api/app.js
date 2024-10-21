import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 9001;
router.listen(port, () => {
  console.log("Server listening on port " + port);
});
