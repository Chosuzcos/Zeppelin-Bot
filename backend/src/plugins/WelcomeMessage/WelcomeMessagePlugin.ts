import { PluginOptions, guildPlugin } from "knub";
import { GuildLogs } from "../../data/GuildLogs";
import { LogsPlugin } from "../Logs/LogsPlugin";
import { SendWelcomeMessageEvt } from "./events/SendWelcomeMessageEvt";
import { WelcomeMessagePluginType, zWelcomeMessageConfig } from "./types";

const defaultOptions: PluginOptions<WelcomeMessagePluginType> = {
  config: {
    send_dm: true,
    send_to_channel: null,
    message: `
# 🎉[user][server]へようこそ

サーバーをご利用いただく前に、まずは 📜 [ルール](https://discord.com/channels/1122080011822825475/1122083465895100516) をご確認ください。こちらには、サーバーのご利用にあたって守っていただくべきルールやマナーが記載されています。皆さまが快適に過ごせる環境を整えるため、必ずご一読ください。

また、サーバーに関する最新情報や重要な告知は、📢[告知チャンネル](https://discord.com/channels/1122080011822825475/1124285854890856458) で随時お知らせいたしますので、こちらも定期的にご確認いただくようお願いいたします。

---

### 🛡️ サーバー利用のための手続き

サーバー内の全ての機能を利用するには、🔗[ 認証チャンネル](https://discord.com/channels/1122080011822825475/1122090258897580082) で**Robloxアカウントの紐付け**が必要です。以下のガイドに従って、紐付けを行ってください：

- 💻 [PC版の紐付け方法](https://www.youtube.com/watch?v=SbDltmom1R8)
- 📱 [モバイル版の紐付け方法](https://www.youtube.com/watch?v=RhC8AIv1Mfk)
`
  },
};

export const WelcomeMessagePlugin = guildPlugin<WelcomeMessagePluginType>()({
  name: "welcome_message",

  dependencies: () => [LogsPlugin],
  configParser: (input) => zWelcomeMessageConfig.parse(input),
  defaultOptions,

  // prettier-ignore
  events: [
    SendWelcomeMessageEvt,
  ],

  beforeLoad(pluginData) {
    const { state, guild } = pluginData;

    state.logs = new GuildLogs(guild.id);
    state.sentWelcomeMessages = new Set();
  },
});
