export type ChatMessage = {
    sessionId: string;
    chatInput: string;
};
export type ChatResponse = {
    responseType: 'asnwer' | 'fallback';
    displayText: string;
    data?: any;
};
