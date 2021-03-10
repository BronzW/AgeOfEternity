import * as winston from "winston"

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "log.txt",
            format: winston.format.simple()
        }),
        new winston.transports.File({
            filename: "log.json",
            format: winston.format.json()
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            level: 'debug'
        })
    ]
})

export default logger