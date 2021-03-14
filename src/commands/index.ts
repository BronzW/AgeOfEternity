import Command from "./command";
import Ping from "./ping";
import Create from "./create";

const commands: Array<Command> = [
    Ping,
    Create
]

export default commands