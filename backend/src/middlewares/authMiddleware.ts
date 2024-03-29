import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export type AuthRequest = Request & { user?: User };

export async function authVerify(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  const token = authHeader?.split(" ")[1];
  // console.log({ token: token });

  if (!token) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    const payload = (await jwt.verify(token, JWT_SECRET)) as {
      tokenId: number;
    };
    // console.log({ payload: payload });
    if (!payload?.tokenId) {
      return res.sendStatus(401);
    }
    const dbToken = await prisma.token.findUnique({
      where: {
        id: payload?.tokenId,
      },
      include: {
        user: true,
      },
    });
    if (!dbToken?.valid || dbToken.expiration < new Date()) {
      return res.status(401).json({ error: "Not Valid" });
    }

    req.user = dbToken.user;
    // console.log("dbtoken-", dbToken?.user.id);
  } catch (error) {
    return res.status(401).json({ error: "Not Validated" });
  }
  next();
}
