import useConversation from "../zustand/useConverstion.ts";
import Messages from "./Messages.tsx";
import MessagesInput from "./MessagesInput.tsx";


function MessagesContainer() {
    const { selectedConversation, setSelectedConversation } = useConversation();
    return (
        <div className="md:min-w-[450px] flex flex-col justify-center">
            {!selectedConversation ? (
                noChatSelected()
            ) : (
                <>
                    <div className="bg-slate-500 px-4 py-2">
                        <span className="label-text">To: <span className="text-gray-900 font-bold">{selectedConversation.username}</span></span>
                    </div>

                    <Messages />
                    <MessagesInput />
                </>
            )}
        </div>
    )
}

const noChatSelected = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h3 className="text-white stat-title">Welcome Daf XF</h3>
            <br />
            <h4 className="text-white">Select a coversation to start messaging</h4>
        </div>
    );
}

export default MessagesContainer;