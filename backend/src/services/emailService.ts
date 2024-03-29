import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";
dotenv.config();
const ses = new SESClient({ region: "eu-west-2" });

function createSendEmailCommand(
  toAddress: string,
  fromAddress: string,
  message: string
) {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Source: fromAddress,
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Your One-Time Password",
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
    },
  });
}

const toEmailAddress = process.env.MY_EMAIL_ADDRESS as string;

export async function sendEmailToken(email: string, token: string) {
  const message = `Your One time Password is ${token}`;
  const command = createSendEmailCommand(email, toEmailAddress, message);
  try {
    ses.send(command);
  } catch (error) {
    console.log("error sending email-", error);
  }
}
