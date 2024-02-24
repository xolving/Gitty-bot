import "dotenv/config";

export interface Config {
  discordToken: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN ?? "",
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? ""
};
