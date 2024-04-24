import { MessageLog } from "common-types";
import useMessages from "../../../hooks/useMessages"
import { FC } from "react";
import './ListMessage.css';

// message log keys
type HeaderRecord = Record<keyof Pick<MessageLog, 'category' | 'channel' | 'userId' | 'created' | 'id' | 'message'>, string>

const MessageRecord: FC<{ message: MessageLog | HeaderRecord }> = ({ message }) => {
  const createdDate = new Date(message.created)

  return (
    <div className="message-record">
      <div>{message.id}</div>
      <div>{message.userId}</div>
      <div>{message.message}</div>
      <div>{message.category}</div>
      <div>{message.channel}</div>
      <div>
        {
          // If its a number, convert it to a date string, otherwise, return it as text
          Number.isInteger(createdDate.getTime()) ? createdDate.toLocaleString() : message.created
        }
      </div>
    </div>
  )
}

const listHeaders: HeaderRecord = {
  id: 'ID',
  userId: 'User',
  message: 'Message',
  category: 'Category',
  channel: 'Channel',
  created: 'Created'
}

const ListMessage = () => {
  const { messages } = useMessages();

  return (
    <div className="list-messages">
      <MessageRecord message={listHeaders} />
      {messages.map((m) => (
        <MessageRecord key={m.id} message={m} />
      ))}
    </div>
  )
}

export default ListMessage