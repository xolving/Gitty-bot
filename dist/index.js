"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const PiarBot_1 = require("./PiarBot");
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
});
exports.bot = new PiarBot_1.PiarBot(client);
