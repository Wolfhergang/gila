import getHttpClient from "../http"

type SMSResponse = {
    success: boolean
}

const httpClient = getHttpClient<SMSResponse>()

export const sendSMS = async (phone: string, message: string) => {
    // This is a mock function that simulates sending an SMS
    console.log(`Sending SMS to ${phone}`)
    console.log(`Message: ${message}`)

    const res = await httpClient.POST('/another_service', { 
        phone, 
        message
    })

    if(!res.success) throw new Error('Failed to send SMS')

    console.log('SMS sent successfully')
    return true
}