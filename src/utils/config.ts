import "dotenv/config";

export interface Config {
  discordToken: string;
  githubToken: string;
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN ?? "",
  githubToken: process.env.GITHUB_TOKEN ?? "",
  apiKey: process.env.API_KEY ?? "",
  authDomain: process.env.AUTH_DOMAIN ?? "",
  projectId: process.env.PROJECT_ID ?? "",
  storageBucket: process.env.STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.MESSAGING_SENDER_ID ?? "",
  appId: process.env.APP_ID ?? "",
  measurementId: process.env.MEASUREMENT_ID ?? ""
};
