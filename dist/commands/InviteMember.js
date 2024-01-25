"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const octokit_1 = require("octokit");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("invite")
        .setDescription("Github 초대하기")
        .addStringOption((option) => option
        .setName("email")
        .setDescription("초대할 멤버의 이메일을 입력해주세요.")
        .setRequired(true))
        .addStringOption(option => option.setName('role')
        .setDescription('Github 역할을 선택해주세요.')
        .setRequired(false)
        .addChoices({ name: 'Android', value: 'Android.Team' }, { name: 'Backend', value: 'BackEnd.Team' }, { name: 'Frontend', value: 'Front.Team' }, { name: 'DevOps', value: 'Dev-Ops-Engineer.Team' }, { name: 'iOS', value: 'iOS.Team' })),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = interaction.options.getString("email");
            const octokit = new octokit_1.Octokit({
                auth: "Bearer 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",
            });
            yield octokit.request('POST /orgs/GSM-MSG/invitations', {
                email: `${email}`,
                // role: 'direct_member',
                // team_ids: [
                //   12,
                //   26
                // ],
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            yield interaction.reply({
                content: `성공적으로 초대를 보냈습니다.`,
            });
        });
    },
};
