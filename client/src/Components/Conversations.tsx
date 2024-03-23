import useGetConversation from "../hooks/useGetConversations";
import { ObjectId } from "mongodb";
import Conversation from "./Conversation";


interface IConversation {
  username: string,
  email: string,
  _v: number,
  _id: ObjectId | string;
}

function Conversations() {
  const { conversations } = useGetConversation();
  console.log(1)

  return (
    <div>
      {conversations.map((conversation: IConversation, index: number) => (

            <Conversation
              key={conversation._id}
              lastIndex={index === conversations.length - 1}
              conversation={conversation}
            />
      ))}
    </div>
  )
}

export default Conversations;