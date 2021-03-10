import Command from "./command";
import {Message} from "discord.js";

const command: Command =  {
    aliases: ["ping"],
    description: "Pings the bot",

    async run(msg: Message, args: Array<String>): Promise<void> {
        await msg.reply("Pong!")
        await msg.channel.send(`Got: ${args}`)
    }
}

export default command