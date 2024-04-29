import { Category } from "common-types"
import { getUsersWithCategory } from "../../repositories/user/user.repository"
import {sendMessageToUser } from "../../repositories/message/message.repository"

// Broadcast a message to all users subscribed to a specific category
export const sendNotification = async (message: string, category: Category) => {
    const usersWithCategory = await getUsersWithCategory(category)

    if(!usersWithCategory.length) return

    const notifications = usersWithCategory.map(async user => sendMessageToUser(message, category, user))

    await Promise.all(notifications)
}