import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";

export default {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("메시지를 보냅니다.")
    .addStringOption((option) => option
      .setName("title")
      .setDescription("제목을 지정해주세요.")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("description")
      .setDescription("내용을 지정해주세요.")
      .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const title = interaction.options.getString("title") ?? ""
    const description = interaction.options.getString("description")?.replace(/\\n/g, '\n') ?? ""

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
      ]
    });
  },
} as Command;