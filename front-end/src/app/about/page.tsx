'use client';

import * as React from 'react';

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Stack,
    Link as MuiLink,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper
} from '@mui/material';
import { CodeIcon, GitHubIcon, GroupsIcon, HandshakeIcon, LinkIcon } from '@/theme/icons';

// ------------------------------------------------------
// DADOS DA PÁGINA (Você pode substituir por dados reais)
// ------------------------------------------------------

const teamMembers = [
    {
        name: 'Alisson R. Santos',
        role: 'Desenvolvedor Full-Stack, Designer & IA',
        description: 'Especialista em criar soluções inteligentes e eficientes, liderando o desenvolvimento técnico do projeto desde a concepção até a implementação.',
        imageUrl: 'equipe/alisson.jpeg', // Substitua pelo caminho da imagem
    },
    {
        name: 'Ronald Evangelista',
        role: 'Administrador, Desenvolvedor, Idealizador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: '/path/to/your/image2.jpg',
    },
    {
        name: 'Davi Coelho',
        role: 'Administrador, Desenvolvedor, Idealizador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: '/path/to/your/image2.jpg',
    },
    {
        name: 'Geovanna Barros',
        role: 'Administrador, Desenvolvedor, Idealizador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: '/path/to/your/image2.jpg',
    },
    {
        name: 'Matheus Corrêa',
        role: 'Administrador, Desenvolvedor, Idealizador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: '/path/to/your/image2.jpg',
    },

];

const projectLinks = [
    {
        name: 'Repositório no GitHub',
        url: 'https://github.com/Alisson-Ramos/CodeSightAI-PortoHack', // Substitua pelo seu link
        icon: <GitHubIcon />,
    },
    {
        name: 'Documentação do Projeto',
        url: 'https://github.com/Alisson-Ramos/CodeSightAI-PortoHack/blob/Master/README.md',
        icon: <CodeIcon />,
    }
];

// DADOS PARA A NOVA SEÇÃO DE LOGOS
const partnersAndSupporters = [
    {
        name: 'Porto Hack',
        logoUrl: '/icons/portohack.jpg', // Coloque os logos na pasta /public/logos/
        websiteUrl: 'https://www.portohacksantos.com.br/',
    },
    {
        name: 'Instituto AmiGU',
        logoUrl: '/icons/amigu.png',
        websiteUrl: 'https://www.portohacksantos.com.br/',
    },
    {
        name: 'Abtra',
        logoUrl: '/icons/abtra.png',
        websiteUrl: 'https://www.abtra.org.br/institucional/',
    },
    {
        name: 'Codeco',
        logoUrl: '/icons/codeco.png',
        websiteUrl: 'https://github.com/Codeco3',
    },
];


// ------------------------------------------------------
// COMPONENTE DA PÁGINA
// ------------------------------------------------------

export default function AboutPage() {
    return (
        <Box>
            {/* SEÇÃO 1: BANNER */}
            <Box
                sx={{
                    height: { xs: '40vh', md: '50vh' },
                    backgroundImage: 'url(/banner.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                    textAlign: 'center',
                }}
            >
                {/* Overlay */}
                <Box
                    sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative' }}>
                    <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                        Sobre o CascadeSightAI
                    </Typography>
                    <Typography variant="h5" component="p" color="text.secondary" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Uma solução preditiva para otimização de operações portuárias.
                    </Typography>
                </Container>
            </Box>

            {/* SEÇÃO 2: CONTEÚDO PRINCIPAL */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Stack spacing={8}>

                    {/* DESCRIÇÃO DO PROJETO */}
                    <Paper elevation={0} variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
                        <Stack spacing={2} alignItems="center" textAlign="center">
                            <CodeIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h4" component="h2" fontWeight="bold">
                                Nossa Missão
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth="md">
                                O CascadeSightAI nasceu da necessidade de trazer mais eficiência e previsibilidade para o complexo ambiente portuário. Utilizando inteligência artificial e análise de dados em tempo real, nossa plataforma identifica gargalos operacionais antes que eles aconteçam, permitindo que terminais e agências marítimas tomem decisões proativas, reduzam atrasos e otimizem a alocação de recursos.
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* EQUIPE */}
                    <Box textAlign="center">
                        <Stack spacing={2} alignItems="center">
                            <GroupsIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h4" component="h2" fontWeight="bold">
                                Conheça Nossa Equipe
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mb: 4 }}>
                                Somos um time multidisciplinar apaixonado por tecnologia e logística, unido pelo desafio de revolucionar o setor portuário.
                            </Typography>
                        </Stack>
                        <Grid container spacing={4} justifyContent="center">
                            {teamMembers.map((member) => (
                                <Grid key={member.name} size={12}>
                                    <Card elevation={0} sx={{ textAlign: 'center', backgroundColor: 'transparent' }}>
                                        <Avatar
                                            alt={member.name}
                                            src={member.imageUrl}
                                            sx={{ width: 120, height: 120, margin: '0 auto 16px', boxShadow: 3 }}
                                        />
                                        <CardContent sx={{ p: 1 }}>
                                            <Typography variant="h6" component="div" fontWeight="bold">
                                                {member.name}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="primary.main">
                                                {member.role}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {member.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* ====================================================== */}
                    {/* NOVA SEÇÃO: IDEALIZADORES E APOIADORES (LOGOS)         */}
                    {/* ====================================================== */}
                    <Box textAlign="center">
                        <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
                            <HandshakeIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h4" component="h2" fontWeight="bold">
                                Idealizadores e Apoiadores
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth="md">
                                Este projeto é impulsionado pela colaboração com instituições de ponta e pelo uso de tecnologias inovadoras.
                            </Typography>
                        </Stack>

                        <Grid container spacing={{ xs: 4, md: 2 }} justifyContent="center" alignItems="center">
                            {partnersAndSupporters.map((partner) => (
                                <Grid key={partner.name} size={2}>
                                    <MuiLink href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'block' }}>
                                        <Box
                                            component="img"
                                            src={partner.logoUrl}
                                            alt={`Logo ${partner.name}`}
                                            sx={{
                                                width: '100%',
                                                maxWidth: 120, // Tamanho máximo para os logos
                                                height: 'auto',
                                                filter: 'grayscale(100%)', // Começa em preto e branco
                                                opacity: 0.7,
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    filter: 'grayscale(0%)', // Fica colorido no hover
                                                    opacity: 1,
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        />
                                    </MuiLink>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* LINKS */}
                    <Box>
                        <Stack spacing={2} alignItems="center" textAlign="center">
                            <LinkIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h4" component="h2" fontWeight="bold">
                                Links Úteis
                            </Typography>
                        </Stack>
                        <Paper variant="outlined" sx={{ mt: 3, maxWidth: 'sm', mx: 'auto', borderRadius: 3 }}>
                            <List>
                                {projectLinks.map((link, index) => (
                                    <ListItem key={link.name} disablePadding divider={index < projectLinks.length - 1}>
                                        <ListItemButton component={MuiLink} href={link.url} target="_blank" rel="noopener noreferrer">
                                            <ListItemIcon>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>

                </Stack>
            </Container>
        </Box>
    );
}
