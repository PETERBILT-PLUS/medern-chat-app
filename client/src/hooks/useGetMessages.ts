import React from "react";
import useConversation from "../zustand/useConverstion.ts";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";

const useGetMessages = () => {
    const { selectedConversation, messages, setMessages } = useConversation();

    React.useEffect(() => {
        const getMessages = async () => {
            try {
                const res: AxiosResponse = await axios.get(`http://localhost:3001/message/${selectedConversation?._id}`, { withCredentials: true });
                if (res.data.success) {
                    setMessages(res.data.Conversations);
                }
            } catch (error) {
                toast.error("An Error Happend");
                console.log(error);
            }
        }
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);
    return ({ messages });
}

export default useGetMessages;