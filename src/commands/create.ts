import Command from "./command";
import {Message} from "discord.js";
import Embed from "./embed";
import Player from "../models/player";

const command: Command = {
    aliases: ["create"],
    description: "Create your character",

    async run(msg: Message, args: Array<String>): Promise<void> {
        if (msg.channel.type == "news") return

        const player = await Player.findOne({discord: msg.author.id})

        if (player) {
            await msg.reply("You already have a character!")
            return
        }

        const embed = new Embed(msg.channel, msg.author)
        const race = await embed.choice("Pick your race", ["Dwarf", "Elf", "Human"])
        const name = await embed.question("What's your name?")

        await new Player({
            name: name.content,
            race,
            discord: msg.author.id
        }).save()

        await msg.reply("Successfully created character")
    }
}

export default command;
