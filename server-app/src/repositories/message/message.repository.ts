import { Category, MessageLog, NotificationChannel, User } from "common-types"
import { getUUID } from "../../utils/string"
import logger from "../../services/logger"
import DB from "../../services/db"
import { LogTypes } from "common-types/types/log.types"
import { addToQueue, getQueue } from "../../services/queue"
import getHttpClient from "../../services/http"
import { logarithmicRetry } from "../../utils/recursive"
import { sendPushNotification } from "../../services/push-notifications"
import { sendEmail } from "../../services/email"
import { sendSMS } from "../../services/sms"

export const QUEUE_ID = 'message-queue'

export const buildMessage = (message: string, category: Category): Pick<MessageLog, 'message' | 'id' | 'created' | 'type' | 'category'> => ({
    created: Date.now(),
    type: 'messageLog' as LogTypes,
    id: getUUID(),
    message,
    category,
})

export const sendMessage = async (message: MessageLog) => {
    await DB.Logs.insert(JSON.stringify(message))
    
    await addToQueue(QUEUE_ID, message)
    
    logger.info(`Message sent by ${message.channel} for user ${message.userId}`)
    return 
}

const buildMetadata = (channel: NotificationChannel, user: User) => {
    switch(channel) {
        case 'Push Notification':
            return {
                // it is common to link the device token to the user's phone number, but it can be any unique identifier
                deviceToken: user.phoneNumber
            }
        case 'E-Mail':
            return {
                email: user.email
            }
        case 'SMS':
            return {
                phone: user.phoneNumber
            }
        default:
            return {}
    }
}

export const sendMessageToUser = async (message: string, category: Category, user: User) => {
    const logInserts = user.channels.map(async channel => await sendMessage({ 
        ...buildMessage(message, category), // new message per channel
        meta: buildMetadata(channel, user),
        userId: user.id,
        category,
        channel
    }))

    return Promise.all(logInserts)
}

export const messageQueueResolver = async (payload: MessageLog) => {
    try {
        
        const process = await logarithmicRetry(async(attempt) => {
            logger.info(`Attempting to process message ${payload.id} (attempt ${attempt + 1})`)
            
            switch(payload.channel) {
                case 'Push Notification':
                    await sendPushNotification(payload.meta!.deviceToken as string, payload.message)
                    break
                case "E-Mail":
                    await sendEmail(payload.meta!.email as string, `You have a new ${payload.category} related message`, payload.message)
                    break
                case 'SMS':
                    await sendSMS(payload.meta!.phone as string, payload.message)
                    break
                default:
                    break
            }
            
            logger.info(`Message ${payload.id} sent`)
        }, 3, 3000)

        return process
} catch (error) {
        logger.error(`Error sending message ${payload.id} on channel: ${payload.channel} for user: ${payload.userId}`)
        return 0
    }
}

// initialize message queue
getQueue(QUEUE_ID, messageQueueResolver)
