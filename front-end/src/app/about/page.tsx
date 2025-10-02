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
    Paper,
    Tooltip
} from '@mui/material';
// ADIÇÃO: Ícones para a nova seção ESG (substitua pelos seus ícones reais)
import { VerifiedUser as EsgIcon } from '@mui/icons-material';
import { CodeIcon, GitHubIcon, GroupsIcon, HandshakeIcon, LinkIcon, PublicIcon } from '@/theme/icons';


// ------------------------------------------------------
// DADOS DA PÁGINA
// ------------------------------------------------------

const teamMembers = [
    {
        name: 'Alisson R. Santos',
        role: 'Desenvolvedor Full-Stack, Designer & IA',
        description: 'Especialista em criar soluções inteligentes e eficientes, liderando o desenvolvimento técnico do projeto desde a concepção até a implementação.',
        imageUrl: 'equipe/alisson.jpeg',
    },
    {
        name: 'Ronald Evangelista',
        role: 'Administrador, Desenvolvedor, Idealizador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: 'equipe/ronald.webp',
    },
    {
        name: 'Davi Coelho',
        role: 'Administrador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: 'equipe/davi.jpeg',
    },
    {
        name: 'Geovanna Barros',
        role: 'Administradora',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solução atenda às necessidades operacionais.',
        imageUrl: 'equipe/geovanna.webp',
    },
    {
        name: 'Matheus Corrêa',
        role: 'Administrador',
        description: 'Responsável pela arquitetura de dados e pela análise dos requisitos do sistema, garantindo que a solution atenda às necessidades operacionais.',
        imageUrl: 'equipe/matheus.webp',
    },
];

const projectLinks = [
    {
        name: 'Repositório no GitHub',
        url: 'https://github.com/Alisson-Ramos/CodeSightAI-PortoHack',
        icon: <GitHubIcon />,
    },
    {
        name: 'Documentação do Projeto',
        url: 'https://github.com/Alisson-Ramos/CodeSightAI-PortoHack/blob/Master/README.md',
        icon: <CodeIcon />,
    }
];

const partnersAndSupporters = [
    {
        name: 'Porto Hack',
        logoUrl: '/icons/portohack.jpg',
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

const sustainableDevelopmentGoals = [
    {
        id: 'ODS 8',
        title: 'Trabalho Decente e Crescimento Econômico',
        description: 'Ao otimizar operações, promovemos um ambiente de trabalho mais eficiente e seguro, contribuindo para o crescimento econômico sustentável do setor portuário.',
        iconUrl: '/ods/ods8.webp',
    },
    {
        id: 'ODS 9',
        title: 'Indústria, Inovação e Infraestrutura',
        description: 'Nossa plataforma é uma inovação tecnológica que moderniza a infraestrutura portuária, tornando a indústria logística mais resiliente e inteligente.',
        iconUrl: '/ods/ods9.jpeg',
    },
    {
        id: 'ODS 11',
        title: 'Cidades e Comunidades Sustentáveis',
        description: 'A eficiência portuária reduz o congestionamento em áreas urbanas próximas aos portos, diminuindo a poluição e melhorando a qualidade de vida.',
        iconUrl: '/ods/ods11.jpg',
    },
    {
        id: 'ODS 17',
        title: 'Parcerias e Meios de Implementação',
        description: 'Fomentamos parcerias entre os diversos atores do ecossistema portuário, criando uma rede colaborativa para alcançar os objetivos de sustentabilidade.',
        iconUrl: '/ods/ods17.webp',
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
                    {/* SEÇÃO ODS */}
                    <Box textAlign="center">
                        <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
                            <PublicIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h4" component="h2" fontWeight="bold">
                                Nosso Impacto nos ODS
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth="md">
                                Acreditamos que a tecnologia deve gerar valor para a sociedade. Veja como o CascadeSightAI contribui para os Objetivos de Desenvolvimento Sustentável da ONU.
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={{ xs: 2, sm: 4 }} justifyContent="center" alignItems="center" flexWrap="wrap">
                            {sustainableDevelopmentGoals.map((ods) => (
                                <Tooltip key={ods.id} arrow title={
                                    <Box sx={{ p: 1 }}>
                                        <Typography color="inherit" component="div" fontWeight="bold">{ods.id}: {ods.title}</Typography>
                                        <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>{ods.description}</Typography>
                                    </Box>
                                }>
                                    <Box component="img" src={ods.iconUrl} alt={ods.title} sx={{
                                        cursor: 'pointer',
                                        width: { xs: 60, sm: 80, md: 100 },
                                        height: 'auto',
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': { transform: 'scale(1.1)' },
                                    }} />
                                </Tooltip>
                            ))}
                        </Stack>
                    </Box>
                    {/* ====================================================== */}
                    {/* NOVA SEÇÃO: NOSSO COMPROMISSO ESG                     */}
                    {/* ====================================================== */}
                    <Box textAlign="center">
                        <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
                            <EsgIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h4" component="h2" fontWeight="bold">
                                Nosso Compromisso ESG
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth="md">
                                Atuamos com responsabilidade, integrando práticas ambientais, sociais e de governança em nossa solução para gerar valor sustentável.
                            </Typography>
                        </Stack>
                    </Box>

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
                                        <Avatar alt={member.name} src={member.imageUrl} sx={{ width: 120, height: 120, margin: '0 auto 16px', boxShadow: 3 }} />
                                        <CardContent sx={{ p: 1 }}>
                                            <Typography variant="h6" component="div" fontWeight="bold">{member.name}</Typography>
                                            <Typography sx={{ mb: 1.5 }} color="primary.main">{member.role}</Typography>
                                            <Typography variant="body2" color="text.secondary">{member.description}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* IDEALIZADORES E APOIADORES */}
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
                                <Grid key={partner.name} size={3}>
                                    <MuiLink href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'block' }}>
                                        <Box component="img" src={partner.logoUrl} alt={`Logo ${partner.name}`} sx={{
                                            width: '100%',
                                            maxWidth: 120,
                                            height: 'auto',
                                            filter: 'grayscale(100%)',
                                            opacity: 0.7,
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                filter: 'grayscale(0%)',
                                                opacity: 1,
                                                transform: 'scale(1.05)',
                                            },
                                        }} />
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
                                            <ListItemIcon>{link.icon}</ListItemIcon>
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
