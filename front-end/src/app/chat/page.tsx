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
    CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { keyframes } from '@mui/system';
import { AnchorIcon } from '@/theme/icons';

// Define a estrutura de uma mensagem
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

// Animação para o indicador de "digitando"
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
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    // Efeito para rolar para a última mensagem
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);


    const handleSend = () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            const aiResponseText = getSimpleAIResponse(input);
            const aiMessage: Message = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1500 + Math.random() * 500);
    };

    const getSimpleAIResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes('ajuda')) return 'Claro! Posso ajudar com status de navios, previsões de atraso ou documentação pendente. O que você gostaria de saber?';
        if (lowerInput.includes('atrasado') || lowerInput.includes('msc-delay-006')) return 'O navio MSC-DELAY-006 tem um atraso preditivo de 10 horas devido a pendências na Receita Federal e Anvisa. A ação recomendada é submeter o manifesto de cargas perigosas com urgência.';
        if (lowerInput.includes('cancelado') || lowerInput.includes('maersk-cancel-007')) return 'A operação do navio MAERSK-CANCEL-007 foi cancelada por irregularidades na inspeção de segurança. Recomendo iniciar um processo administrativo para a regularização.';
        if (lowerInput.includes('olá') || lowerInput.includes('oi')) return `Olá! Em que posso ser útil hoje?`;
        return "Não tenho certeza de como responder a isso. Poderia reformular sua pergunta? Posso fornecer informações sobre o status dos navios.";
    };

    return (
        // ALTERAÇÃO: Estilos do Paper principal foram ajustados para 100% da tela.
        <Paper
            elevation={0} // Removemos a sombra
            sx={{
                height: '95vh', // 100% da altura da viewport (tela)
                display: 'flex',
                flexDirection: 'column',
                // Removemos borderRadius e centralização (mx) para ocupar a tela toda
                borderRadius: 0,
                boxShadow: 'none',
            }}
        >
            {/* Cabeçalho do Chat */}
            <Box sx={{
                p: 2,
                backgroundColor: '#4D22E9',

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
                                <Typography variant="body1">{msg.text}</Typography>
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
        </Paper>
    );
}
