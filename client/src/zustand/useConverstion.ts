import { create } from "zustand";
import { ObjectId } from "mongodb"

interface Message {
    id: ObjectId | string;
    content: string;
    // Add other properties as needed
}

interface ConversationState {
    selectedConversation: {
        username: string,
        email: string,
        _v: number,
        _id: ObjectId
    } | null;
    messages: Message[];
}

interface ConversationActions {
    setSelectedConversation: (selectedConversation: {
        username: string,
        email: string,
        _v: number,
        _id: ObjectId
    } | null) => void;
    setMessages: (messages: Message[]) => void;
}


const useConversation = create<ConversationState & ConversationActions>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;