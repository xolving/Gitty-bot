import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Octokit } from "octokit";
import { Command } from "../interfaces/Command";
import { config } from "../utils/config";

interface Repository {
  name: string,
  description: string
}

export default {
  data: new SlashCommandBuilder()
    .setName("repositories")
    .setDescription("Repository 목록을 조회합니다."),

  async execute(interaction: ChatInputCommandInteraction) {
    const octokit = new Octokit({
      auth: `Bearer ${config.githubToken}`
    })

    const data = await octokit.request('GET /orgs/{org}/repos', {
      org: 'GSM-MSG ',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    // await interaction.reply({
    //   content: `${repositories.data.at(0)?.name}`,
    // });
    
    const repositories = new Array<Repository>
    const repos = data.data.forEach(repo => repositories.push({
      name: repo.name,
      description: repo.description ?? ""
    }))

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