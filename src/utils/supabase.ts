import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

interface SetGithub {
  guildId: string;
  githubOrganization: string;
  githubToken: string;
}

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);

export async function insertInitial(guildId: string){
  const { data, error } = await supabase
    .from('server')
    .insert([
      {
        guild_id: guildId
      }
    ]).select()

  return data
}

export async function updateGithub({
  guildId,
  githubOrganization,
  githubToken,
}: SetGithub) {
  const { data, error } = await supabase
  .from('server')
  .update({
    github_organization: githubOrganization,
    github_token: githubToken
   })
  .eq('guild_id', guildId)
  .select()

  return data;
}

export async function updateFirstRole(firstRole: string, guildId: string) {
  const { data, error } = await supabase
  .from('server')
  .update({
    first_role: firstRole
   })
  .eq('guild_id', guildId)
  .select()

  return data;
}

export async function selectServer(guildId: string){
  let { data: server, error } = await supabase
  .from('server')
  .select("*")
  .eq('guild_id', guildId)

  return server
}