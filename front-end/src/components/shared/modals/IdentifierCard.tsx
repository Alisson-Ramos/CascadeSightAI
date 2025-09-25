'use client';

import React from 'react';
import { Backdrop, Box, Fade, Grid, Modal, Typography } from '@mui/material';
import Logo from '@/images/icons/logo.png';
interface ModalFotoVisitanteProps {
  open: boolean;
  onClose: () => void;
  nome: string;
  fotoUrl: string;
  empresa: string;
  documento: string;
}

export const IdenfierCard: React.FC<ModalFotoVisitanteProps> = ({
  open,
  onClose,
  nome,
  fotoUrl,
  empresa,
  documento
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
         backdropFilter: 'blur(4px)',               // efeito vidro
         WebkitBackdropFilter: 'blur(4px)',         // suporte Safari
                backgroundColor: 'rgba(0, 0, 0, 0.8)',      // fundo escuro com transparência
            }
        },
        
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 6,
            p: 3,
            borderRadius: 2,
            maxWidth: 800,
            width: '90%',
            textAlign: 'center',
          }}
        >
            <Grid display={'flex'}>
            <Box
            component="img"
            src={fotoUrl}
            alt={`Foto de ${nome}`}
            sx={{
              width: '50%',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
          <Grid ml={2} display={'flex'} flexDirection={'column'} textAlign={'start'}>
            <Typography  gutterBottom color='BLACK' sx={{ p: 0, m: 0}}>
                IDENTIFICAÇÃO VIRTUAL DO VISITANTE
            </Typography>
            <Typography  gutterBottom color='grey' sx={{ p: 0, m: 0}}>
            NOME:
          </Typography>
            <Typography variant="h5" sx={{ p: 0, m: 0, mT: 1, fontWeight: 600 }} gutterBottom>
            {nome}
          </Typography>
          <Typography  gutterBottom color='grey' sx={{ p: 0, m: 0}}>
            Documento:
          </Typography>
          <Typography variant="h5" sx={{ p: 0, m: 0, mT: 1, fontWeight: 600 }} gutterBottom>
            {documento}
          </Typography>
          <Typography  gutterBottom color='grey' sx={{ p: 0, m: 0}}>
            Empresa:
          </Typography>
          <Typography variant="h5" sx={{ p: 0, m: 0, mT: 1, fontWeight: 600 }} gutterBottom>
            {empresa}
          </Typography>
          <Grid
           sx={{
            position: 'absolute',
            top: '80%',
            left: '47%',
            p: 3,
            maxWidth: 800,
            width: '90%',
            textAlign: 'center',
          }}>
           <img src={Logo.src} alt="LOGO" width={'100px'} />
           </Grid>
          </Grid>
          
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
