'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, ThemeProvider } from "@mui/material";
import { NavigationItem } from "@/interfaces/Navigation";
import theme from "@/theme/theme";

interface ModalsProps {
    modalopen: boolean;
    modalContent: NavigationItem | null;
    onClose: () => void;
}

export function Modals({ modalopen, modalContent, onClose }: ModalsProps) {
    if (!modalContent) return null;

    // Aqui você pode condicionar qual modal abrir baseado no segment ou outro atributo
    switch (modalContent.segment) {
        case 'diario':
            return <ThemeProvider theme={theme}> <></> </ThemeProvider>;


        default:
            return (
                <Dialog open={modalopen} onClose={onClose}>
                    <DialogTitle>{modalContent.title}</DialogTitle>
                    <DialogContent>
                        <Typography>Conteúdo genérico para {modalContent.title}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Fechar</Button>
                    </DialogActions>
                </Dialog>
            );
    }
}
