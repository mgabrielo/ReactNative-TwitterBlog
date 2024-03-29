import { useAuth } from "@/context/AuthContext";
export const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
import * as SecureStore from "expo-secure-store";
export const listTweets = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const url = `${API_URL}/tweet`;
    // const authToken = await SecureStore.getItemAsync("authToken");
    // console.log({ authTokenAgain: authToken });
    const { authToken } = useAuth();
    if (!authToken) {
      return;
    }
    authToken &&
      (await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => {
          if (res.status == 401) {
            throw new Error("Please Sign in To View Tweets");
          }
          if (res.status !== 200) {
            throw new Error("Error fetching Tweets");
          }
          return res.json();
        })
        .then((result) => {
          // console.log("new-result", result);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        }));
  });
};

export const getTweet = (id: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const url = `${API_URL}/tweet/${id}`;
    const authToken = await SecureStore.getItemAsync("authToken");
    if (!authToken && authToken !== undefined) {
      return;
    }

    authToken &&
      (await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => {
          if (res.status == 401) {
            throw new Error("Please Sign in To View Tweets");
          }
          if (res.status !== 200) {
            throw new Error("Error fetching Tweets");
          }
          return res.json();
        })
        .then((result) => {
          // console.log("tweet-result", result);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        }));
  });
};
export const createTweet = (data: { content: string }): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const url = `${API_URL}/tweet`;
    const { authToken } = useAuth();
    if (!authToken) {
      return;
    }

    authToken &&
      (await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status == 401) {
            throw new Error("Please Sign in To View Tweets");
          }
          if (res.status !== 200) {
            throw new Error("Error fetching Tweets");
          }
          return res.json();
        })
        .then((result) => {
          // console.log("tweet-result", result);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        }));
  });
};
