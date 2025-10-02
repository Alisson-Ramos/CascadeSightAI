'use client';

import * as React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Paper,
    TextField,
    InputAdornment,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Link as MuiLink,
    Button
} from '@mui/material';
import { ContactSupportIcon, EmailIcon, ExpandMoreIcon, SearchIcon, SupportAgentIcon } from '@/theme/icons';

// Ícones


// ------------------------------------------------------
// DADOS DA PÁGINA (Substitua pelo seu conteúdo de FAQ)
// ------------------------------------------------------

const faqItems = [
    {
        question: 'O que é o CascadeSightAI?',
        answer: 'O CascadeSightAI é uma plataforma de análise preditiva projetada para otimizar operações portuárias. Usamos inteligência artificial para prever gargalos, atrasos e outras pendências, permitindo que os gestores tomem decisões mais assertivas.'
    },
    {
        question: 'Como o painel de pendências funciona?',
        answer: 'O painel de pendências consolida informações de diversas fontes (Agência Marítima, Anvisa, Receita Federal, etc.) em tempo real. Cada navio é exibido em um card que resume seu status. Status críticos (vermelho) indicam problemas graves como cancelamentos, enquanto status de aviso (amarelo) indicam atrasos ou pendências que precisam de atenção.'
    },
    {
        question: 'As recomendações são geradas automaticamente?',
        answer: 'Sim. Nossos algoritmos de IA analisam a natureza de cada pendência e o contexto operacional para sugerir um conjunto de ações recomendadas. O objetivo é fornecer um guia claro para a resolução rápida de problemas.'
    },
    {
        question: 'Qual o principal impacto do CascadeSightAI no Porto?',
        answer: 'O CascadeSightAI elimina a necessidade de fundeio. Ao garantir que todos os serviços estejam alinhados e prontos, removemos o tempo de espera da equação logística, liberando capacidade do canal de acesso e reduzindo custos.'
    },
    {
        question: 'O que o Mecanismo Preditivo de I.A. faz na plataforma?',
        answer: 'Sim. Nossos algoritmos de IA analisam a natureza de cada pendência e o contexto operacional para sugerir um conjunto de ações recomendadas. O objetivo é fornecer um guia claro para a resolução rápida de problemas.'
    },
    {
        question: 'As recomendações são geradas automaticamente?',
        answer: 'Sim. Nossos algoritmos de IA analisam a natureza de cada pendência e o contexto operacional para sugerir um conjunto de ações recomendadas. O objetivo é fornecer um guia claro para a resolução rápida de problemas.'
    },
];


// ------------------------------------------------------
// COMPONENTE DA PÁGINA DE AJUDA
// ------------------------------------------------------

export default function HelpPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredFaqs, setFilteredFaqs] = React.useState(faqItems);

    // Efeito para filtrar as FAQs conforme o usuário digita na busca
    React.useEffect(() => {
        const results = faqItems.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFaqs(results);
    }, [searchTerm]);


    return (
        <Box>
            {/* SEÇÃO 1: BANNER */}
            <Box sx={{ backgroundColor: 'grey.100', height: { xs: '40vh', md: '50vh' }, py: { xs: 3, md: 2 } }} >
                <Container maxWidth="md" >
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <ContactSupportIcon color="primary" sx={{ fontSize: 60 }} />
                        <Typography variant="h2" component="h1" fontWeight="bold">
                            Central de Ajuda
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Olá! Como podemos ajudar você hoje? Encontre respostas rápidas abaixo ou entre em contato conosco.
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            {/* SEÇÃO 2: CONTEÚDO PRINCIPAL */}
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Stack spacing={6}>

                    {/* BARRA DE PESQUISA */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Pesquisar por palavras-chave (ex: painel, senha, navio...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2 }
                        }}
                    />

                    {/* LISTA DE FAQs */}
                    <Box>
                        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                            Perguntas Frequentes
                        </Typography>
                        <Stack spacing={2}>
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <Accordion key={index} sx={{ border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' }, borderRadius: 2, boxShadow: 0 }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${index}-content`}
                                            id={`panel${index}-header`}
                                        >
                                            <Typography fontWeight="medium">{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ backgroundColor: 'grey.50' }}>
                                            <Typography color="text.secondary">{faq.answer}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            ) : (
                                <Typography textAlign="center" color="text.secondary" sx={{ py: 4 }}>
                                    Nenhum resultado encontrado para sua busca. Tente outras palavras-chave.
                                </Typography>
                            )}
                        </Stack>
                    </Box>

                    {/* SEÇÃO DE CONTATO */}
                    <Paper elevation={0} variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
                        <Stack spacing={2} alignItems="center" textAlign="center">
                            <SupportAgentIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Ainda não encontrou o que procura?
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth="sm">
                                Nossa equipe de suporte está pronta para ajudar. Entre em contato por um dos canais abaixo.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                                <Button variant="contained" startIcon={<EmailIcon />} component={MuiLink} href="mailto:suporte@cascadesight.ai">
                                    Enviar um E-mail
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>

                </Stack>
            </Container>
        </Box >
    );
}
