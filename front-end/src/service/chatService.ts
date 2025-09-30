
import { api } from "@/libs/apiClient";
import { ChatMessage, ChatResponse } from "@/types/chatType";

export const sendChatMessage = async (message: ChatMessage): Promise<ChatResponse> => {
    console.log("Enviando para a API:", message);
    return await api.post<ChatResponse>('/webhook/chat', [message]);
};
