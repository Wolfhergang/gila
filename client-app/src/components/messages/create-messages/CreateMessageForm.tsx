import { useState } from "react";
import useMessages from "../../../hooks/useMessages"
import { NewMessage } from "../../../resources/message";
import { Category } from "common-types";
import './CreateMessageForm.css';

const availableCategories: Category[] = ["Finance", "Movies", "Sports"];

const CreateMessage = () => {
    const { addMessage } = useMessages();

    const [newMessage, setNewMessage] = useState<NewMessage>({ message: '', category: 'Finance' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addMessage(newMessage);
        setNewMessage({ message: '', category: 'Finance' });
        alert('Message added!');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewMessage((prev) => ({ ...prev, [name]: value }));
    }

    const isValid = !!newMessage.message.length && !!newMessage.category.length;

    return (
        <form className="create-message" onSubmit={handleSubmit}>
            <label>
                Message:
                <input
                    type='text'
                    name="message"
                    value={newMessage.message}
                    onChange={handleChange}
                />
            </label>
            <label>
                Category:
                <select
                    name="category"
                    value={newMessage.category}
                    onChange={handleChange}
                >
                    {availableCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            <button disabled={!isValid} type='submit'>Add message</button>
        </form>
    )
}

export default CreateMessage