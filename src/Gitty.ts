import { Client, Events, Interaction, REST, Routes } from "discord.js";
import InviteMember from "./commands/InviteMember";
import ListRepository from "./commands/ListRepository";
import SendEmbed from "./commands/SendEmbed";
import SetDefault from "./commands/SetDefault";
import { Command } from "./interfaces/Command";
import { config } from "./utils/config";

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
  }

  private async registerSlashCommands() {
    const discordREST = new REST({ version: "10" }).setToken(
      config.discordToken,
    );
    const slashCommands: Array<Command> = [
      InviteMember,
      ListRepository,
      SetDefault,
      SendEmbed
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
}
