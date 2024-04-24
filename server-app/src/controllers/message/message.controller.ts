import { RequestHandler } from "express"
import DB from "../../services/db/db"
import { MessageLog } from "common-types"
import { getUUID } from "../../utils/string"
import { Category } from "common-types"
import { getUsersWithCategory } from "../../repositories/user/user.repository"
import logger from "../../services/logger"

const createMessage : RequestHandler = async (req, res) => {
    const { message, category } = req.body as { message: string, category: Category }

    if(!message || !category) return res.status(400).json({ message: "Missing required fields" })
    
    const usersWithCategory = await getUsersWithCategory(category)

    if(!usersWithCategory.length) return res.status(200).json({ ok: true })

    const logInserts = usersWithCategory.map(async user => {
        return Promise.all(
            user.channels.map(async channel => {
                const newMessageLog: MessageLog = {
                    type: "messageLog",
                    id: getUUID(),
                    message,
                    created: Date.now(),
                    category,
                    channel,
                    userId: user.id
                }
                
                // store the message log
                await DB.Logs.insert(JSON.stringify(newMessageLog))

                // Send it to a queue or something magical to deal with the message.... or not
                logger.info(`\nMessage sent by ${channel} for user ${user.id}\n`)

                return  newMessageLog
            })
        )
    })

    await Promise.all(logInserts)
    
    return res.status(200).json({ ok: true })
}

const getMessages : RequestHandler = async (_, res) => {
    const logs = await DB.Logs.fetch()
        
    return res.status(200).json(logs)
}

export default {
    createMessage,
    getMessages    
}