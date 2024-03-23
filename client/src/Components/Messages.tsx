import useGetMessages from "../hooks/useGetMessages.ts";
import Message from "./Message.tsx";


function Messages() {
  const { messages } = useGetMessages();
  console.log(messages)

  return (
    <div className="overflow-auto px-4">
      {messages?.map((message) => {
        return (
          <Message myMessage={message} />
        );
      })}
    </div>
  )
}

export default Messages;