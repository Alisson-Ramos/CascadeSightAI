'use client';

import React, { useMemo } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface MaskedRGCPFProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string; // pode ser com máscara ou apenas dígitos
  onChange: (rawDigits: string, formatted: string) => void;
  maxRG?: number; // default 9
  maxCPF?: number; // default 11
  label?: string;
}

// Formatação sem dependências
const onlyDigits = (v: string) => v.replace(/\D/g, '');

function formatRG(digits: string) {
  // vamos formatar como: 12.345.678-9 (até 9 dígitos)
  const d = digits.slice(0, 9);
  if (!d) return '';
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}-${d.slice(8)}`;
}

function formatCPF(digits: string) {
  // formato: 000.000.000-00 (11 dígitos)
  const d = digits.slice(0, 11);
  if (!d) return '';
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export default function MaskedRGCPF({
  value,
  onChange,
  maxRG = 9,
  maxCPF = 11,
  label = 'RG / CPF',
  ...rest
}: MaskedRGCPFProps) {
  // sempre trabalhamos com dígitos "raw"
  const raw = onlyDigits(value || '');

  // Decide máscara baseado no tamanho atual do raw (muda dinamicamente)
  const usingCPF = raw.length > maxRG;
  const maxAllowed = usingCPF ? maxCPF : maxRG;
  const truncated = raw.slice(0, maxAllowed);

  const formatted = useMemo(() => (usingCPF ? formatCPF(truncated) : formatRG(truncated)), [usingCPF, truncated]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const input = e.target.value; // pode conter máscara
    const digits = onlyDigits(input).slice(0, maxCPF);

    const useCPF = digits.length > maxRG;
    const finalTrunc = digits.slice(0, useCPF ? maxCPF : maxRG);
    const finalFormatted = useCPF ? formatCPF(finalTrunc) : formatRG(finalTrunc);

    onChange(finalTrunc, finalFormatted);
  };

  return (
    <TextField
      {...rest}
      label={label}
      value={formatted}
      onChange={handleChange}
      inputMode="numeric"
      autoComplete="off"
    />
  );
}
