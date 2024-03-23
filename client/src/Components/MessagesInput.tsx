import { BsSend } from "react-icons/bs";
import useSendMessage from "../hooks/useSendMessage";
import React from "react";

function MessagesInput() {
    const [message, setMessage] = React.useState<string>("");
    const { sendMessage } = useSendMessage();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    }

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text" value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className="border text-sm rounded-lg w-full py-2 px-3 bg-gray-700 border-gray-600" placeholder="Send A Mesage" />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 text-white">
                    <BsSend />
                </button>
            </div>
        </form>
    )
}

export default MessagesInput;