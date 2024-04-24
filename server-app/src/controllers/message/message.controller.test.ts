import { Category } from "common-types";
import messageController from "./message.controller";

jest.mock("../../services/db", () => ({
    Logs: {
        insert: jest.fn()
    },
    User: {
        get: jest.fn()
    }
}));

import DB from "../../services/db";

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

describe("messageController", () => {
    describe("createMessage", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return a 400 status if the request body is missing required fields", async () => {
            const mockRequest = {
                body: {
                    message: "I am a test!!"
                }
            };

            await messageController.createMessage(mockRequest as any, mockResponse as any, () => {});

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });

        it("should be able to insert a message on a correct post", async () => {
            (DB.User.get as jest.Mock).mockResolvedValueOnce(Promise.resolve([{
                id: "test-id",
                channels: ["email"]
            }]));

            const mockRequest: { body: { message: string, category: Category } } = {
                body: {
                    message: "I am a test!!",
                    category: "Sports"
                }
            };
    
            await messageController.createMessage(mockRequest as any, mockResponse as any, () => {});

            expect(DB.Logs.insert).toHaveBeenCalledTimes(1);
            expect(DB.Logs.insert).toHaveBeenCalledWith(expect.any(String));
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });
    });
});