import type { NotificationChannel } from "./notification.types"
import type { Category } from "./category.types" 

export type User = {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    subscribed: Category[], // Lists of the categories where the user is subscribed
    channels: NotificationChannel[] // List of the notification's channels
}