import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);

export async function insertServer(organization: string, id: string, token: string) {
  const { data, error } = await supabase
    .from('server')
    .insert([
      { github_organization: organization, discord_id: id, github_token: token},
    ])
    .select()

    return data
}

export async function selectServer(id: string){
  let { data: server, error } = await supabase
  .from('server')
  .select("*")
  .eq('discord_id', id)

  return server
}