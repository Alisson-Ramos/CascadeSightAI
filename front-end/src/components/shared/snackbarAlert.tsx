// components/SnackbarAlert.tsx
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { AlertType } from '@/hooks/useSnackbar';

type SnackbarAlertProps = {
  open: boolean;
  message: string;
  type: AlertType;
  onClose: () => void;
};

export function SnackbarAlert({ open, message, type, onClose }: SnackbarAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert onClose={onClose} severity={type} sx={{ width: '100%' }} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
