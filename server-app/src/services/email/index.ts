import getHttpClient from "../http"

type EmailResponse = {
    success: boolean
}

const httpClient = getHttpClient<EmailResponse>()

export const sendEmail = async (email: string, subject: string, message: string) => {
    // This is a mock function that simulates sending an email
    console.log(`Sending email to ${email} with subject: ${subject}`)
    console.log(`Message: ${message}`)

    const res = await httpClient.POST('/some_email_service', { 
        email,
        subject, 
        message
    })

    if(!res.success) throw new Error('Failed to send Email')

    console.log('Email sent successfully')
    return true
}