import { Message, MessageReaction } from 'discord.js'
import Embed from '.'

/**
 *
 * Example:
 * new Pageinator(msg, 'My Epic Paginator', ['1', '2', '3', '4', '5'], (item: any) => { return item }, 2)
 *
 */

export default class Pageinator {
    message: Message
    title: string
    items: any
    func: Function
    maxNumber: number

    constructor(message: Message, title: any, items: any, func: any, maxNumber = 4) {
        this.message = message
        this.items = items
        this.maxNumber = maxNumber
        this.func = func
        this.title = title
        if (message.channel.type !== 'news') this.display(this.generate())
    }

    async display(embeds: string | any[]) {
        let currentPage = 0
        const pagemsg = (count: number) => `Page (${count + 1}/${embeds.length})`
        const embed = await this.message.channel.send(pagemsg(currentPage), embeds[currentPage])

        const reactions = ['⏪', '⬅️', '➡️', '⏩', '🗑️']
        for (let reaction of reactions) {
            embed.react(reaction)
        }

        const filter = (reaction: { emoji: { name: string } }, user: { id: any }) =>
            reactions.includes(reaction.emoji.name) && this.message.author.id === user.id

        const collector = embed.createReactionCollector(filter)

        collector.on('collect', (reaction: MessageReaction, user: any) => {
            if (reaction.emoji.name === reactions[0]) {
                currentPage = 0
                embed.edit(pagemsg(currentPage), embeds[currentPage])
            } else if (reaction.emoji.name === reactions[1]) {
                if (currentPage != 0) {
                    --currentPage
                    embed.edit(pagemsg(currentPage), embeds[currentPage])
                }
            } else if (reaction.emoji.name === reactions[2]) {
                if (currentPage < embeds.length - 1) {
                    currentPage++
                    embed.edit(pagemsg(currentPage), embeds[currentPage])
                }
            } else if (reaction.emoji.name === reactions[3]) {
                currentPage = embeds.length - 1
                embed.edit(pagemsg(currentPage), embeds[currentPage])
            } else if (reaction.emoji.name === reactions[4]) {
                embed.delete()
                return
            }
            reaction.users.remove(user)
        })
    }

    generate() {
        const embeds = []
        let max = this.maxNumber
        let k = this.maxNumber
        for (let i = 0; i < this.items.length; i += max) {
            const current = this.items.slice(i, k)
            k += max

            const display = current.map((item: any) => this.func(item)).join('\n')

            /* @ts-ignore */
            const embed = new Embed(this.message.channel, this.message.author).setTitle(this.title).setDescription(display)
            embeds.push(embed)
        }
        return embeds
    }
}
