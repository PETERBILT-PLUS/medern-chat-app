import useConversation from "../zustand/useConverstion";


function Conversation({ conversation, lastIndex }) {

    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConversation(conversation)}>
                <div className="avatar-online">
                    <div className="w-12 rounded-full">
                        <img src={""} alt="img" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.username}</p>
                    </div>
                </div>
            </div>

            {!lastIndex && <div className="divider bg-gray-600 h-1 py-0 my-0"></div>}
        </>
    )
}

export default Conversation;