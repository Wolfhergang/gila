import { Category } from "./category.types"
import { NotificationChannel } from "./notification.types"

export type LogTypes = 'messageLog'

export type Log = {
    id: string
    message: string
    type: LogTypes
    created: number // timestamp in milliseconds, harder to deal with actual dates but easier to sort :P
    meta?: {
        phone?: string
        email?: string
        deviceToken?: string
    }
}

export type MessageLog = {
    channel: NotificationChannel
    category: Category
    userId: string
    type: 'messageLog'
} & Log