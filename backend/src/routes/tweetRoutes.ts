import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { content, image } = req.body;
    const user = req.user;
    // console.log(content, image, user);
    if (!user) {
      return res.status(400).json({ error: "could not create user's tweet" });
    }
    const newTweet = await prisma.tweet.create({
      data: {
        content,
        image,
        userId: user?.id,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(newTweet);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not create tweet" });
  }
});

router.get("/", async (req, res) => {
  const allTweets = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          name: true,
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });
  if (allTweets) {
    res.json(allTweets);
  } else {
    res.status(400).json({ message: "No tweets Available" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const existingTweet = await prisma.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
    },
  });
  if (existingTweet) {
    res.json(existingTweet);
  } else {
    res.status(400).json({ message: "No tweets Available" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tweet.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "tweet deleted succcessfully" });
  } catch (error) {
    res.status(400).json({ message: "could not delete user" });
  }
});

export default router;
