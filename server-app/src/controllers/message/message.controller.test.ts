import { Category } from "common-types";
import messageController from "./message.controller";
import { sendNotification } from "../../services/notification";

jest.mock("../../services/notification", () => ({
    sendNotification: jest.fn()
}));

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
            const mockRequest: { body: { message: string, category: Category } } = {
                body: {
                    message: "I am a test!!",
                    category: "Sports"
                }
            };
    
            await messageController.createMessage(mockRequest as any, mockResponse as any, () => {});

            expect(sendNotification).toHaveBeenCalledTimes(1);
            expect(sendNotification).toHaveBeenCalledWith("I am a test!!", "Sports");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });
    });
});