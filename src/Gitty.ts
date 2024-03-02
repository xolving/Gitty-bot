import { Client, Events, GuildMember, Interaction, REST, Routes } from "discord.js";
import InviteMember from "./commands/InviteMember";
import ListRepository from "./commands/ListRepository";
import SendEmbed from "./commands/SendEmbed";
import SetFirstRole from "./commands/SetFirstRole";
import SetGithub from "./commands/SetGithub";
import SetInitial from "./commands/SetInitial";
import { Command } from "./interfaces/Command";
import { config } from "./utils/config";
import { selectServer } from "./utils/supabase";

export class Gitty {
  private slashCommandMap = new Map<string, Command>();

  public constructor(private readonly client: Client) {
    this.client.login(config.discordToken);

    this.client.on("ready", () => {
      console.log(`${this.client.user?.username ?? ""} ready!`);

      this.registerSlashCommands();
    });

    this.client.on("warn", (info) => console.log(info));
    this.client.on("error", console.error);

    this.onInteractionReceived();
    this.onGuildMemberAdd();
  }

  private async registerSlashCommands() {
    const discordREST = new REST({ version: "10" }).setToken(
      config.discordToken,
    );
    const slashCommands: Array<Command> = [
      InviteMember,
      ListRepository,
      SetGithub,
      SendEmbed,
      SetFirstRole,
      SetInitial
    ];

    this.slashCommandMap = slashCommands.reduce((map, command) => {
      map.set(command.data.name, command);
      return map;
    }, new Map<string, Command>());

    await discordREST.put(
      Routes.applicationCommands(this.client.user?.id ?? ""),
      {
        body: slashCommands.map((command) => command.data.toJSON()),
      },
    );
  }

  private async onInteractionReceived() {
    this.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = this.slashCommandMap.get(interaction.commandName);

        if (!command) return;

        try {
          await command.execute(interaction);
        } catch (error: any) {
          console.error(error);

          await interaction.reply({
            content: error.toString(),
          });
        }
      },
    );
  }

  private async onGuildMemberAdd() {
    this.client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
      const guilds = await selectServer(member.guild.id) ?? [];
      const guild = guilds.at(0)
      
      if(guild.first_role){
        member.roles.add(guild.first_role);
      }
    });
  }
}
