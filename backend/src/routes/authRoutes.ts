import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { sendEmailToken } from "../services/emailService";

const router = Router();
const prisma = new PrismaClient();
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET as string;

function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number): string {
  const jwtPayLoad = { tokenId };
  return jwt.sign(jwtPayLoad, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

// create if not exist and generate email-token to send to email
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );
  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailtoken: emailToken,
        expiration: expiration,
        user: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              email,
            },
          },
        },
      },
    });

    // console.log(createdToken);
    await sendEmailToken(email, emailToken);
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something Bad happened" });
  }
});
// validate email token
// generate long life-span jwt token
router.post("/authenticate", async (req, res) => {
  const { email, emailToken } = req.body;
  const dbEmailToken = await prisma.token.findUnique({
    where: {
      emailtoken: emailToken,
    },
    include: {
      user: true,
    },
  });
  // console.log(dbEmailToken);
  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.sendStatus(401);
  }
  if (dbEmailToken.expiration < new Date()) {
    return res.status(401).json({ message: "Token Expired" });
  }
  if (dbEmailToken?.user?.email !== email) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );
  //generate API Token
  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration: expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  await prisma.token.update({
    where: {
      id: dbEmailToken.id,
    },
    data: {
      valid: false,
    },
  });
  const authToken = generateAuthToken(apiToken.id);

  return res.status(200).json({ token: authToken });
});

export default router;
