import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { insertInitial } from "../utils/supabase";

export default {
  data: new SlashCommandBuilder()
    .setName("initial")
    .setDescription("데이터베이스에 서버 ID를 저장합니다."),
  async execute(interaction: ChatInputCommandInteraction) {
    if(!interaction.memberPermissions?.has("Administrator")) return
    const guildId = interaction.guild?.id ?? "";
    await insertInitial(guildId);
    await interaction.reply({
      content: '성공적으로 등록하였습니다.',
      ephemeral: true
    });
  },
} as Command;
