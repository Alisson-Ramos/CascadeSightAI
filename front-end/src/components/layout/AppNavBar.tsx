'use client';

import * as React from 'react';
import Link from 'next/link';
import logotipo from '../../images/icons/logo.png';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
    IconButton,
    Avatar,
    Grid, // Keep the Grid import
    Tooltip,
    Autocomplete,
    TextField,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';


import { NavigationItem } from '@/interfaces/Navigation';
import { ExpandLess, MenuIcon } from '@/theme/icons';
import { ExpandMore, Logout } from '@mui/icons-material';
import { NavBarColors, SearchPagesSx } from '@/theme/theme';
import { MinimalRoutes } from '../_utils/NavigationRoutes';
import router from 'next/router';
import { Modals } from './AppNavBarModals';
import CustomModal from '../shared/modals/CustomModal';

// -------------------------
// Utils (Unchanged)
// -------------------------
const norm = (s: string) => s.replace(/\/+$/g, '');
const cleanSeg = (s: string) => s.replace(/^\/+|\/+$/g, '');
const joinPath = (segments: string[]) =>
    '/' + segments.filter(Boolean).map(cleanSeg).join('/');

const buildFullPath = (ancestors: NavigationItem[], item: NavigationItem) =>
    joinPath([...ancestors, item].map(i => i.segment));

const isPathActive = (pathname: string, targetPath: string) =>
    norm(pathname).startsWith(norm(targetPath));

function SearchPages() {
    const router = useRouter();

    const handleSelect = (event: any, value: any) => {
        if (value?.path) {
            router.push(value.path);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Autocomplete
                freeSolo
                options={MinimalRoutes}
                getOptionLabel={option =>
                    typeof option === 'string' ? option : option.label
                }
                onChange={handleSelect}
                renderInput={params => (
                    <TextField
                        sx={SearchPagesSx}
                        {...params}
                        size="small"
                        placeholder="Buscar Páginas..."
                    />
                )}
            />
        </Box>
    );
}

export default function AppNavBar({ navigation }: { navigation: NavigationItem[] }) {
    const [isDrawerOpen, setDrawerOpen] = React.useState(true);
    const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});


    const [user, setUser] = React.useState<{ name: string; identifier: string } | null>(null);
    const pathname = usePathname();
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const [hasTokenId, setHasTokenId] = React.useState(true);
    const searchParams = useSearchParams();
    React.useEffect(() => {
        const uuid = searchParams.get('uuid');
        const token = searchParams.get('token');
        if (localStorage.getItem('token') && localStorage.getItem('uuid')) {
            if (hasTokenId) setHasTokenId(false);
        }

        if (uuid && token) {
            localStorage.setItem('uuid', uuid);
            localStorage.setItem('token', token);
            setHasTokenId(false);
        }
    }, [searchParams]);


    const name = user?.name ?? 'Carregando';
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    const handleMenuClick = (segment: string) => {
        setOpenMenus((prev) => ({ ...prev, [segment]: !prev[segment] }));
    };

    React.useEffect(() => {
        const activePath = findActivePath(navigation, pathname);
        if (activePath) {
            const openKeys: { [key: string]: boolean } = {};
            for (const node of activePath.slice(0, -1)) {
                openKeys[buildFullPath([], node)] = true;
            }
            setOpenMenus(openKeys);
        }
    }, [pathname, navigation]);

    const [modalContent, setModalContent] = React.useState<NavigationItem | null>(null);
    const [isModalOpen, setModalOpen] = React.useState(false);

    const handleItemClick = (item: NavigationItem, fullPath: string) => {
        if (item.modal) {
            setModalContent(item);
            setModalOpen(true);
        } else {
            window.location.href = fullPath;
        }
    };


    const renderNavItems = (items: NavigationItem[], ancestors: NavigationItem[] = []) => {
        return items.map(item => {
            if (item.kind === 'divider') {
                return <Divider key={`divider-${Math.random()}`} sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />;
            }

            const fullPath = buildFullPath(ancestors, item);
            const active = isPathActive(pathname, fullPath);

            if (item.children?.length) {
                const isOpen = openMenus[fullPath] || false;
                return (
                    <React.Fragment key={fullPath}>
                        <ListItemButton onClick={() => handleMenuClick(fullPath)} sx={getListItemStyles(active)}>
                            <ListItemIcon sx={{ color: active ? NavBarColors.active : NavBarColors.icon }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                            {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 2, borderLeft: `1px solid ${NavBarColors.icon}`, ml: 2 }}>
                                <List component="div" disablePadding>
                                    {renderNavItems(item.children, [...ancestors, item])}
                                </List>
                            </Box>
                        </Collapse>
                    </React.Fragment>
                );
            }

            // Item normal ou modal
            return (
                <ListItemButton
                    key={fullPath}
                    onClick={() => handleItemClick(item, fullPath)}
                    selected={active}
                    sx={getListItemStyles(active)}
                >
                    <ListItemIcon sx={{ color: active ? NavBarColors.active : NavBarColors.icon }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            );
        });
    };

    // Renderizar o modal


    return (
        <>
            <IconButton
                onClick={() => setDrawerOpen(!isDrawerOpen)}
                sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300, color: 'black', backgroundColor: NavBarColors.background }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                variant="persistent"
                open={isDrawerOpen}
                sx={{
                    width: isDrawerOpen ? 280 : 0,
                    transition: 'width 0.3s ease',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                        backgroundColor: NavBarColors.background,
                        color: NavBarColors.text,
                        borderRight: '0.1px solid rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                    },
                }}
            >
                <Grid container sx={{ p: 2, mt: 1, textAlign: 'center' }}>
                    <Grid size={12}>
                        <img src={logotipo.src} width='150px' alt="Logo" />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="caption" sx={{ color: NavBarColors.icon, letterSpacing: '1px', fontSize: 8 }}>
                            SOLUÇÃO PARA ANÁLISE DE PENDêNCIAS
                        </Typography>
                    </Grid>
                </Grid>
                {/* NÃO VOU USAR */}
                {/* <Box sx={{ pl: 2, pr: 2, mt: 0, textAlign: 'center' }}>
                    <SearchPages />
                </Box> */}
                <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                <List sx={{
                    px: 2,
                    flexGrow: 1,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '3px',
                    },
                }}>
                    {renderNavItems(navigation)}
                </List>

                {/* <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ p: 2, borderTop: `1px solid rgba(255, 255, 255, 0.1)`, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: NavBarColors.active }}>{initials}</Avatar>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: NavBarColors.textHover }}>{name}</Typography>
                    <Tooltip title="Sair">
                        <Logout sx={{ ml: 'auto', color: NavBarColors.icon, cursor: 'pointer' }} onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }} />
                    </Tooltip>
                </Box> */}
            </Drawer>
            <CustomModal open={hasTokenId} title='Acesso Negado' onClose={() => { redirect('/') }}>
                <DialogContent>
                    <Typography variant="body1">
                        Você não tem permissão para acessar esta página. Por favor, solicite ao administrador seu acesso.
                    </Typography>
                </DialogContent>
            </CustomModal>
            <Modals
                modalopen={isModalOpen}
                modalContent={modalContent}
                onClose={() => setModalOpen(false)}
            />

        </>
    );
}

const getListItemStyles = (isActive: boolean) => ({
    py: 1.2,
    mb: 0.5,
    borderRadius: '8px',
    color: isActive ? NavBarColors.active : NavBarColors.text,
    backgroundColor: isActive ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
    '&:hover': {
        backgroundColor: NavBarColors.hover,
        color: NavBarColors.textHover,
        '& .MuiListItemIcon-root': {
            color: NavBarColors.active,
        },
    },
    '&.Mui-selected': {
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        background: NavBarColors.active, // O seu linear-gradient
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.2)',
        },
        '& .MuiListItemIcon-root': {
            color: '#4D22E9', // Cor inicial do seu gradiente
        },
    },
});

// -------------------------
// Localiza caminho ativo n-nível
// -------------------------
function findActivePath(
    items: NavigationItem[],
    pathname: string,
    ancestors: NavigationItem[] = []
): NavigationItem[] | null {
    for (const item of items) {
        const fullPath = buildFullPath(ancestors, item);
        if (isPathActive(pathname, fullPath)) {
            if (item.children?.length) {
                const found = findActivePath(item.children, pathname, [...ancestors, item]);
                if (found) return [item, ...found];
            }
            return [item];
        }
    }
    return null;
}
