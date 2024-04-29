import { MessageLog, User } from "common-types"
import { QUEUE_ID, messageQueueResolver, sendMessageToUser } from "./message.repository"

const mockDbInsert = jest.fn()
jest.mock("../../services/db", () => ({
    __esModule: true,
    default: {
        Logs: {
            insert: () => mockDbInsert()
        }
    }
}))

const mockAddToQueue = jest.fn()
jest.mock("../../services/queue", () => ({
    __esModule: true,
    addToQueue: (...params: any) => mockAddToQueue(...params),
    getQueue: jest.fn()
}))

const mockPOST = jest.fn()
jest.mock("../../services/http", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        POST: () => mockPOST()
    }))
}))

const mockLoggerError = jest.fn()
jest.mock("../../services/logger", () => ({
    __esModule: true,
    default: {
        info: jest.fn(),
        error: () => mockLoggerError()
    }
}))

const mockRetry = (fn: () => Promise<any>) => fn() // bypass the retry logic
jest.mock("../../utils/recursive", () => ({
    __esModule: true,
    logarithmicRetry: (params: any) => mockRetry(params)
}))

describe('Message Repository', () => {
    describe('messageQueueResolver', () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })

        it('should send a message', async () => {
            const payload : MessageLog = {
                id: '123',
                message: 'Hello World',
                type: 'messageLog',
                created: Date.now(),
                category: 'Finance',
                channel: "Push Notification",
                userId: '123',
                meta: {
                    deviceToken: '1234567890'
                }
            }

            mockPOST.mockResolvedValueOnce({ success: true })

            await messageQueueResolver(payload)
            
            expect(mockPOST).toHaveBeenCalled()
        })

        it('should log an error if the message fails to send', async () => {
            const payload : MessageLog = {
                id: '123',
                message: 'Hello World',
                type: 'messageLog',
                created: Date.now(),
                category: 'Finance',
                channel: "Push Notification",
                userId: '123'
            }

            // fail every attempt
            mockPOST.mockRejectedValue('Failed to send message')

            const result = await messageQueueResolver(payload)
            
            expect(result).toBeFalsy()
            expect(mockLoggerError).toHaveBeenCalled()
        })
    })

    describe('sendMessageToUser', () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })

        const testUser: User = {
            id: '123',
            name: 'John Doe',
            channels: ["Push Notification"],
            email: 'fakemail',
            phoneNumber: '1234567890',
            subscribed: ["Finance"]
        }

        it('should be able to send a message', async () => {
            mockPOST.mockResolvedValueOnce({ success: true})
            mockAddToQueue.mockResolvedValueOnce({ ok: true })
            mockDbInsert.mockResolvedValueOnce({ ok: true })

            const result = await sendMessageToUser('Hello World', 'Finance', testUser)
            
            expect(result).toBeTruthy()
            
            expect(mockDbInsert).toHaveBeenCalled() // should save to db
            expect(mockAddToQueue).toHaveBeenCalledWith(QUEUE_ID, expect.anything()) // should add to queue
        })

        it('should be able to send a message through multiple channels', async () => {
            const multiChannelUser: User = {
                ...testUser,
                channels: ["Push Notification", "SMS"]
            }

            mockPOST.mockResolvedValue({ success: true})
            mockAddToQueue.mockResolvedValue({ ok: true })
            mockDbInsert.mockResolvedValue({ ok: true })

            const result = await sendMessageToUser('Hello World', 'Finance', multiChannelUser)
            
            expect(result).toBeTruthy()
            
            expect(mockDbInsert).toHaveBeenCalledTimes(2) // should save to db for both channels
            expect(mockAddToQueue).toHaveBeenCalledWith(QUEUE_ID, expect.anything()) // should add to queue for both channels too
        })
    })
})