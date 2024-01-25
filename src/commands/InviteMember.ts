import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Octokit } from "octokit";
import { Command } from "../interfaces/Command";
import { config } from "../utils/config";

export default {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Github 초대하기")
    .addStringOption((option) => option
      .setName("email")
      .setDescription("초대할 멤버의 이메일을 입력해주세요.")
      .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('role')
        .setDescription('Github 역할을 선택해주세요.')
        .setRequired(false)
        .addChoices(
          { name: 'Android', value: 'Android.Team' },
          { name: 'Backend', value: 'BackEnd.Team' },
          { name: 'Frontend', value: 'Front.Team' },
          { name: 'DevOps', value: 'Dev-Ops-Engineer.Team' },
          { name: 'iOS', value: 'iOS.Team' },
        )),

  async execute(interaction: ChatInputCommandInteraction) {
    const email = interaction.options.getString("email")
    const role = interaction.options.getString("role")

    const octokit = new Octokit({
      auth: `Bearer ${config.githubToken}`,
    });

    await octokit.request('POST /orgs/GSM-MSG/invitations', {
      email: `${email}`,
      role: `${role}`,
      // team_ids: [
      //   12,
      //   26
      // ],
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    await interaction.reply({
      content: `성공적으로 초대를 보냈습니다.`,
    });
  },
} as Command;
