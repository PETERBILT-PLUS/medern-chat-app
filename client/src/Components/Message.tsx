import useConversation from "../zustand/useConverstion";


function Message({ myMessage }) {
    const { message, createdAt, senderId } = myMessage;
    const { selectedConversation } = useConversation();

    return (
        <>
            <div className={senderId == selectedConversation?._id ? "chat chat-start" : "chat chat-end"}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs text-white font-bold opacity-50">{createdAt.toString().slice(0, 10)}</time>
                </div>
                <div className="chat-bubble">{message}</div>
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>
        </>
    )
}

export default Message;