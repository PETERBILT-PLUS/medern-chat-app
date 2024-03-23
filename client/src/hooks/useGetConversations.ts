import axios, { AxiosResponse } from "axios";
import { ObjectId } from "mongodb";
import React from "react";
import { toast } from "react-toastify";


interface IConversation {
    username: string,
    email: string,
    _v: number,
    _id: ObjectId | string;
}

const useGetConversation = () => {
    const [conversations, setConversations] = React.useState<IConversation[]>([]);

    React.useEffect(() => {
        const getConversations = async () => {
            try {
                const res: AxiosResponse = await axios.get("http://localhost:3001/user", { withCredentials: true });
                if (res.status === 500) {
                    toast.error("Iternal Server Error");
                } else if (res.data.success) {
                    console.log(res.data);
                    setConversations(res.data.users || []);
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        getConversations();
    }, []);

    return ({ conversations });
}

export default useGetConversation;