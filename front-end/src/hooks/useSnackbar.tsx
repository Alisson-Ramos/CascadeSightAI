import { useState } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>('info');

  function showSnackbar(msg: string, tipo: AlertType = 'info') {
    setMessage(msg);
    setType(tipo);
    setOpen(true);
  }

  function handleClose(_: any, reason?: string) {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  return {
    open,
    message,
    type,
    showSnackbar,
    handleClose,
  };
}