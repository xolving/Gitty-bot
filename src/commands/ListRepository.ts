import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Octokit } from "octokit";
import { Command } from "../interfaces/Command";
import { config } from "../utils/config";
import { selectServer } from "../utils/supabase";

interface Repository {
  name: string,
  description: string
}

export default {
  data: new SlashCommandBuilder()
    .setName("repositories")
    .setDescription("Repository 목록을 조회합니다."),

  async execute(interaction: ChatInputCommandInteraction) {
    const server = await selectServer(interaction.guildId ?? "")
    const organization = server?.map(data => data.github_organization)

    const octokit = new Octokit({
      auth: `Bearer ${config.githubToken}`
    })

    const data = await octokit.request(`GET /orgs/${organization}/repos`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const repositories = new Array<Repository>

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Repositories")
          .setDescription(`${repositories.map(function(element){
            return `${element.name}` + '\n'
          })}`)
      ]
    });
  },
} as Command;