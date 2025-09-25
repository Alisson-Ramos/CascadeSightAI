// components/modals/ModalConfirmacao.tsx
'use client';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

type ModalConfirmacaoProps = {
  open: boolean;
  titulo?: string;
  mensagem?: string;
  onClose: (resultado: boolean) => void;
};

export function GenericConfirmModal({
  open,
  titulo = 'Confirmar Ação',
  mensagem = 'Deseja continuar?',
  onClose,
}: ModalConfirmacaoProps) {
  const handleConfirmar = () => onClose(true);
  const handleCancelar = () => onClose(false);

  return (
    <Dialog open={open} onClose={handleCancelar}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{mensagem}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelar} color="inherit">
          Não
        </Button>
        <Button onClick={handleConfirmar} color="primary" autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
