import { useEffect, useState } from "react";
import type { MessageLog } from "common-types"
import Message, { NewMessage } from "../resources/message";

const useMessages = () => {
    const [messages, setMessages] = useState<MessageLog[]>([]);
    
    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        const allMessages = await Message.getAll();
        
        setMessages(allMessages);
    };

    const addMessage = async (message: NewMessage) => {
        await Message.create(message);
        await getMessages();
        
        return;
    }
    
    return { messages, addMessage };
}

export default useMessages;