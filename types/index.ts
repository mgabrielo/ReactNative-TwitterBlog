export type User = {
  id: string;
  name: string;
  image?: string;
  username: string;
};
export type TweetType = {
  user?: User;
  content?: string;
  id?: string;
  createdAt?: string;
  image?: string;
  numberOfComments?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
  impressions?: number;
};
