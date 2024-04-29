import { RequestHandler } from "express"
import DB from "../../services/db/db"
import { Category } from "common-types"
import { sendNotification } from "../../services/notification"

const createMessage : RequestHandler = async (req, res) => {
    const { message, category } = req.body as { message: string, category: Category }

    if(!message || !category) return res.status(400).json({ message: "Missing required fields" })

    await sendNotification(req.body.message, req.body.category)

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