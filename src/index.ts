import * as dotenv from "dotenv"
import {Client, Message} from "discord.js"
import logger from "./logger";
import commands from "./commands";
import * as mongoose from "mongoose";

dotenv.config()

const {
    TOKEN,
    PREFIX,
    MONGO_URI
} = process.env

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    logger.info("Connected to Database")
})
const client = new Client()

client.on("ready", () => {
    logger.info("Bot is Online")
})

client.on("message", async (msg: Message) => {
    if (!msg.content.startsWith(PREFIX)) return
    if (msg.author.bot) return

    const cmd = msg.content.slice(PREFIX.length).split(" ")[0]
    const params = msg.content.split(" ").slice(1)

    for (const command of commands) {
        if (command.aliases.includes(cmd)) {
            command.run(msg, params)
            return
        }
    }
})

client.login(TOKEN)