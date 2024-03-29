import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
    },
  });
  if (allUsers) {
    res.json(allUsers);
  } else {
    res.status(400).json({ message: "No users Available" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name, username } = req.body;
    // console.log(email, name, username);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "hello with connect",
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "could not create user" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const existingUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      tweet: true,
    },
  });
  if (existingUser) {
    res.json(existingUser);
  } else {
    res.status(400).json({ message: "No users Available" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, image } = req.body;
  try {
    const result = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        bio,
        name,
        image,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Could Not Update User" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "user deleted succcessfully" });
  } catch (error) {
    res.status(400).json({ message: "could not delete user" });
  }
});

export default router;
