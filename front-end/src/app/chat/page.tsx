'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    Paper,
    Stack,
    Typography,
    Avatar,
    IconButton,
    CircularProgress,
    Button
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import { keyframes } from '@mui/system';
import { AnchorIcon } from '@/theme/icons';

import { ChatMessage, ChatResponse } from '@/types/chatType';
import { sendChatMessage } from '@/service/chatService';
import OperationDetailsModal from '@/components/shared/modals/OperationDetails';


interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    data?: any;
}

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

// Componente principal do Chat
export default function SimpleAIChat() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Olá! Sou seu assistente virtual. Como posso ajudar com as operações portuárias hoje?', sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // ADIÇÃO: Estado para manter um ID de sessão único para a conversa
    const [sessionId] = useState(() => crypto.randomUUID());
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    // Efeito para rolar para a última mensagem
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const [modalOpen, setModalOpen] = useState(false);
    // Estado para guardar os dados do item selecionado
    const [selectedData, setSelectedData] = useState(null);

    const handleOpenModal = (data: any) => {
        setSelectedData(data);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedData(null);
    };

    // =================================================================
    // FUNÇÃO handleSend ATUALIZADA PARA USAR A API
    // =================================================================
    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Prepara a mensagem para a API
            const apiMessage: ChatMessage = {
                sessionId: sessionId,
                chatInput: currentInput,
            };

            // Chama a API
            const response = await sendChatMessage(apiMessage);

            const aiMessage: Message = {
                id: Date.now() + 1,
                text: response.displayText,
                sender: 'ai',
                data: response.data,
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Erro ao comunicar com a API:", error);
            // Cria uma mensagem de erro para o usuário
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
                sender: 'ai',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                height: '95vh',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0,
                boxShadow: 'none',
            }}
        >
            {/* Cabeçalho do Chat */}
            <Box sx={{
                p: 2,
                background: 'linear-gradient(160deg, #4D22E9, #E65AAE)',
                color: 'white',
                flexShrink: 0
            }}>
                <Typography variant="h5" component="div"><strong>Assistente de Operações</strong></Typography>
            </Box>

            {/* Área de Mensagens */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, backgroundColor: 'grey.100' }}>
                <Stack spacing={2}>
                    {messages.map((msg) => (
                        <Stack
                            key={msg.id}
                            direction="row"
                            spacing={1.5}
                            alignItems="flex-start"
                            justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                        >
                            {msg.sender === 'ai' && (
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <AnchorIcon />
                                </Avatar>
                            )}
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 1.5,
                                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                    backgroundColor: msg.sender === 'user' ? 'primary.light' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                                    maxWidth: '80%'
                                }}
                            >
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {msg.text}
                                </Typography>

                                {/* ==============================================================
                                  ADIÇÃO: Renderização formatada do JSON, se existir
                                  ==============================================================
                                */}
                                {msg.data && typeof msg.data === 'object' && (
                                    <Paper
                                        component="pre"
                                        variant="outlined"
                                        sx={{
                                            mt: 1.5,
                                            p: 1,
                                            fontSize: '0.8rem',
                                            lineHeight: 1.4,
                                            borderRadius: 2,
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-all',
                                            backgroundColor: 'grey.200',
                                            color: 'black',
                                        }}
                                    >
                                        <Button variant="outlined" onClick={() => handleOpenModal(msg.data)}>
                                            Ver Detalhes do Navio {msg.data.identificadorNavio}
                                        </Button>
                                    </Paper>
                                )}

                            </Paper>
                            {msg.sender === 'user' && (
                                <Avatar sx={{ bgcolor: 'grey.500' }}>
                                    <PersonIcon />
                                </Avatar>
                            )}
                        </Stack>
                    ))}

                    {isLoading && (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                <AnchorIcon />
                            </Avatar>
                            <Paper elevation={1} sx={{ p: 1.5, borderRadius: '16px 16px 16px 4px', backgroundColor: 'white' }}>
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <Box sx={{ animation: `${pulse} 1.5s infinite`, animationDelay: '0s', width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.400' }} />
                                    <Box sx={{ animation: `${pulse} 1.5s infinite`, animationDelay: '0.2s', width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.400' }} />
                                    <Box sx={{ animation: `${pulse} 1.5s infinite`, animationDelay: '0.4s', width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.400' }} />
                                </Stack>
                            </Paper>
                        </Stack>
                    )}

                    <div ref={chatEndRef} />
                </Stack>
            </Box>

            {/* Área de Input */}
            <Box sx={{ p: 2, backgroundColor: 'white', borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Digite sua mensagem..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                    <IconButton color="primary" onClick={handleSend} disabled={isLoading || input.trim() === ''}>
                        {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                    </IconButton>
                </Stack>
            </Box>
            <OperationDetailsModal
                open={modalOpen}
                onClose={handleCloseModal}
                data={selectedData}
            />
        </Paper>
    );
}
