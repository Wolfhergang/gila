import useMessages from "../../../hooks/useMessages"

const ListMessage = () => {
    const { messages } = useMessages();

  return (
    <ul>
        {messages.map((m) => (
            <li key={m.id}>{m.message}</li>
        ))}
    </ul>
  )
}

export default ListMessage