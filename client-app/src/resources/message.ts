import { MessageLog } from "common-types";
import httpClient from "../utils/httpClient"

export type NewMessage = Pick<MessageLog, 'category' | 'message'>;

const Message = {
    async getAll (){
        const { data } = await httpClient.get<MessageLog[]>("/message");

        return data;
    },
    async create (message: NewMessage){
        await httpClient.post("/message", message);
    }
}

export default Message;