import { Category } from "./category.types"
import { NotificationChannel } from "./notification.types"

export type Log = {
    id: string
    message: string
    type: string
    created: number // timestamp in milliseconds, harder to deal with actual dates but easier to sort :P
    meta?: Record<string, unknown>
}

export type MessageLog = {
    channel: NotificationChannel
    category: Category
    userId: string
    type: 'messageLog'
} & Log