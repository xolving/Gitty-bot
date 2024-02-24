import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Octokit } from "octokit";
import { Command } from "../interfaces/Command";
import { selectServer } from "../utils/supabase";

export default {
  data: new SlashCommandBuilder()
    .setName("repositories")
    .setDescription("Repository 목록을 조회합니다."),

  async execute(interaction: ChatInputCommandInteraction) {
    const servers = await selectServer(interaction.guildId ?? "");
    const server = servers?.at(0);

    const octokit = new Octokit({
      auth: `Bearer ${server.github_token}`
    })

    const repositories = await octokit.request(`GET /orgs/${server.github_organization}/repos`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const info: any[] = repositories.data.map((repo: any) => {
      return {
        name: repo.name,
        description: repo.description,
      }
    })

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Repositories")
          .setDescription(`${info.map((repo) => `${repo.name}` + '\n')}`)
      ]
    });
  },
} as Command;