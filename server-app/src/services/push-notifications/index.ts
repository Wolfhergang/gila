import getHttpClient from "../http"

type PushNotificationResponse = {
    success: boolean
}

const httpClient = getHttpClient<PushNotificationResponse>()

export const sendPushNotification = async (token: string, message: string) => {
    // This is a mock function that simulates sending a push notification
    console.log(`Sending push notification to ${token}`) // token is usually some kind of device token of identifier
    console.log(`Message: ${message}`)

    const res = await httpClient.POST('/some_service', { 
        token, 
        message
    })

    if(!res.success) throw new Error('Failed to send push notification')

    console.log('Push notification sent successfully')
    return true
}