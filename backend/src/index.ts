import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { authVerify } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());
app.use("/user", authVerify, userRoutes);
app.use("/tweet", authVerify, tweetRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("server running on 3000 ");
});
