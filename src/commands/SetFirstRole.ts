import { ChatInputCommandInteraction, Role, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { updateFirstRole } from "../utils/supabase";

export default {
  data: new SlashCommandBuilder()
    .setName("first-role")
    .setDescription("유저가 들어왔을 때 부여할 역할을 지정합니다.")
    .addRoleOption((option) => option
      .setName("role")
      .setDescription("부여할 역할을 지정해주세요.")
      .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    if(!interaction.memberPermissions?.has("Administrator")) return

    const optionRole = interaction.options.getRole("role") as Role;
    await updateFirstRole(optionRole.id, optionRole.guild.id)
    await interaction.reply({
      content: '성공적으로 연동이 완료되었습니다.',
      ephemeral: true
    });
  },
} as Command;
