import {Message} from "discord.js";

export default interface Command {
    aliases: Array<String>
    description: String

    run: (msg: Message, params: Array<String>) => void
}