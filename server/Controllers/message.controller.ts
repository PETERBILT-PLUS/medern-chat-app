import { Request, Response } from "express";
import ConversationModal from "../Models/conversation.modal.js";
import messageModal from "../Models/message.modal.js";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

        let conversation = await ConversationModal.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = new ConversationModal({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new messageModal({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]).then(() => {
            res.status(201).json({ success: true, message: newMessage });
        }).catch(() => {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userChatWith } = req.params;
        const userId = req.user?._id;

        const conversation = await ConversationModal.findOne({
            participants: { $all: [userChatWith, userId] },
        }).populate("messages");

        if (!conversation) return res.status(404).json({ success: false, message: "Conversation not found" });

        res.status(200).json({ success: true, message: "conversation found", Conversations: conversation.messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}