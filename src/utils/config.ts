import "dotenv/config";

export interface Config {
  discordToken: string;
  githubToken: string;
  supabaseKey: string;
  supabaseUrl: string;
}

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN ?? "",
  githubToken: process.env.GITHUB_TOKEN ?? "",
  supabaseKey: process.env.SUPABASE_KEY ?? "",
  supabaseUrl: process.env.SUPABASE_URL ?? ""
};
