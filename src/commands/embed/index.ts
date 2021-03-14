import {DMChannel, Message, MessageCollector, MessageEmbed, ReactionCollector, TextChannel, User} from "discord.js";

const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]

enum Colours {
    BLUE = "#209CEE"
}

export default class Embed extends MessageEmbed {
    channel: TextChannel | DMChannel
    user: User
    msg: Message

    constructor(channel: TextChannel | DMChannel, user: User) {
        super();
        this.channel = channel
        this.user = user
    }


    async question(question: string): Promise<Message> {
        await this.clear()
        this.setColor(Colours.BLUE)
        this.setTitle(question)

        await this.send()
        return this.input()
    }

    async choice(question: string, options: string[]): Promise<string> {
        await this.clear()
        this.setColor(Colours.BLUE)
        this.setTitle(question)

        let description = ""

        let i = 0;

        for (const option of options) {
            description += `${emojis[i++]} - ${option}\n`
        }

        this.setDescription(description)
        await this.send()

        for (const emoji of emojis.slice(0, i)) {
            await this.msg.react(emoji)
        }

        const collector = new ReactionCollector(this.msg, reaction => !reaction.me)

        return new Promise<string>(res => {
            collector.on("collect", reaction => {
                const i = emojis.indexOf(reaction.emoji.toString())

                if (i == -1) {
                    return
                }

                res(options[i])
            })
        })
    }

    private async send() {
        if (this.msg) {
            await this.msg.edit(this)
        } else {
            this.msg = await this.channel.send(this)
        }
    }

    private input(): Promise<Message> {
        return new Promise<Message>(res => {
            const collector = new MessageCollector(this.channel, m => m.author.id === this.user.id)

            collector.on("collect", msg => {
                res(msg)
                collector.stop()
            })
        })
    }

    private async clear() {
        this.setDescription("")
        this.fields = []

        if (this.msg) {
            await this.msg.reactions.removeAll()
        }
    }
}