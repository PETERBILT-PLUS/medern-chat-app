import { toast } from "react-toastify";
import useConversation from "../zustand/useConverstion";
import axios, { AxiosResponse } from "axios";

const useSendMessage = () => {
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        try {
            if (!selectedConversation) {
                toast.error("No conversation selected");
                return;
            }

            const res: AxiosResponse = await axios.post(`http://localhost:3001/message/send/${selectedConversation._id}`, { message }, { withCredentials: true });

            if (res.data.success) {
                setMessages([...messages, res.data.message]);
                toast.success("Message sent successfully");
            } else {
                toast.error(res.data.message || "Failed to send the message");
            }
        } catch (error) {
            toast.error("An error occurred while sending the message");
            console.error("Error sending message:", error);
        }
    };

    return { sendMessage };
};

export default useSendMessage;