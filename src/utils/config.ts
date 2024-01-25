import "dotenv/config";

export interface Config {
  discordToken: string;
  githubToken: string;
}

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN ?? "",
  githubToken: process.env.GITHUB_TOKEN ?? ""
};
