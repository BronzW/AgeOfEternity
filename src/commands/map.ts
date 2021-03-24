import Command from './command'
import { Message } from 'discord.js'
import Embed from './embed'
import Map, { Tile } from '../util/Map/Map'
import { Grass } from '../util/Map/TileType/Tiles/Grass'

const command: Command = {
    aliases: ['map'],
    description: 'Tests out map',

    async run(msg: Message, args: Array<String>): Promise<void> {
        const map = new Map([
            [new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass })],
            [new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass })],
            [new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass })],
            [new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass })],
            [new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass })],
            [new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass }), new Tile({ type: Grass })],
        ])

        map.send(msg.channel)
    },
}

export default command
