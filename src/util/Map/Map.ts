import { DMChannel, NewsChannel, TextChannel } from 'discord.js'
import TileType from './TileType'

export class Tile {
    type: TileType
    x: number
    y: number

    constructor({ type }: { type: TileType }) {
        this.type = type
    }
}

export default class Map {
    tiles: Tile[][] = []
    generated: string = ''

    constructor(tiles?: Tile[][]) {
        this.tiles = tiles

        var tilesLength: number = 0

        for (const tileBlock of tiles) {
            tilesLength += tileBlock.length
        }

        if (!tiles) throw new Error('You cannot have an empty map')

        this.generate()
    }

    generate() {
        for (const tileBlock of this.tiles) {
            for (const tile of tileBlock) {
                this.generated += tile.type.color
            }

            this.generated += '\n'
        }
    }

    send(channel: TextChannel | DMChannel | NewsChannel) {
        channel.send(this.generated)
    }
}
