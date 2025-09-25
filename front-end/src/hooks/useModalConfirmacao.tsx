// hooks/useModalConfirmacao.tsx
import { GenericConfirmModal } from '@/components/shared/modals/GenericConfirmModal';
import React, { useState } from 'react';

export function useModalConfirmacao() {
  const [resolveCallback, setResolveCallback] = useState<(value: boolean) => void>(() => {});
  const [open, setOpen] = useState(false);
  const [mensagem, setMensagem] = useState<string | undefined>();
  const [titulo, setTitulo] = useState<string | undefined>();

  const confirmar = (msg = 'Deseja continuar?', tituloMsg = 'Confirmação'): Promise<boolean> => {
    setMensagem(msg);
    setTitulo(tituloMsg);
    setOpen(true);

    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const handleClose = (resposta: boolean) => {
    setOpen(false);
    resolveCallback(resposta);
  };

 const Modal = (
  <GenericConfirmModal
    open={open}
    mensagem={mensagem}
    titulo={titulo}
    onClose={handleClose}
  />
);


  return { confirmar, Modal };
}
