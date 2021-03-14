import {Document, model, Schema} from "mongoose";

interface IPlayer {
    name: string
    discord: string
    race: string
}

export type IPlayerDoc = IPlayer & Document

const playerSchema = new Schema({
    name: String,
    discord: String,
    race: String
})

const Player = model<IPlayerDoc>("Player", playerSchema)

export default Player;