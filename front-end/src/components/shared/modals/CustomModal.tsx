import * as React from "react";
import { Box, Divider, Grid, IconButton, Modal, Typography } from "@mui/material";
import { CloseIcon } from "@/theme/icons";
import { modalGenericTheme } from "@/theme/theme";


type CustomModalProps = {
    title: string
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string | number;
    height?: string | number;
};

export default function CustomModal({ title, open, onClose, children, width, height }: CustomModalProps) {
    return (
        <Modal open={open} onClose={onClose}>

            <Box sx={modalGenericTheme} width={width} height={height}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography id="modal-cadastro-visitante" variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <IconButton aria-label="fechar" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Divider sx={{ mt: 1, mb: 2 }} />
                {children}</Box>
        </Modal>
    );
}