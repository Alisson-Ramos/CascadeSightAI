// src/components/DetalhesOperacaoModal.tsx

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Chip,
    Box,
    Divider,
} from '@mui/material';

// Definimos uma interface para os dados, para ter autocomplete e segurança de tipos
interface OperationData {
    id: number;
    nomeAgencia: string;
    identificadorNavio: string;
    dataEnvioInformacoes: string;
    manifestoEntregue: boolean;
    documentosAdicionais: string | null;
    statusDocumentacao: string;
    tipoMovimentacao: string;
    dataVerificacao: string | null;
    statusVerificacao: string;
    pendencias: string | null;
    observacoes: string | null;
    dataInspecao: string | null;
    statusSanitario: string;
    inconformidades: string | null;
    dataAutorizacao: string | null;
    statusAutorizacao: string;
    motivoRecusa: string | null;
    nomeArmador: string;
    tipoNavio: string;
    origemNavio: string;
    destinoNavio: string;
    dataPrevisaoChegada: string;
    dataPrevisaoSaida: string;
    statusOperacao: string;
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    data: OperationData | null;
}

// --- Helpers de Formatação ---

// Formata uma string de data para o padrão brasileiro
const formatDate = (dateString: string | null) => {
    if (!dateString) return <Typography component="span" sx={{ color: 'grey.600', fontStyle: 'italic' }}>Não informado</Typography>;
    return new Date(dateString).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Renderiza um Chip colorido para diferentes status
const renderStatusChip = (status: string) => {
    const statusMap: { [key: string]: { label: string; color: 'success' | 'warning' | 'error' | 'info' | 'default' } } = {
        pendente: { label: 'Pendente', color: 'warning' },
        atrasado: { label: 'Atrasado', color: 'error' },
        aguardando_autorizacao: { label: 'Aguardando Autorização', color: 'info' },
        // Adicione outros status aqui conforme necessário
    };
    const config = statusMap[status.toLowerCase()] || { label: status, color: 'default' };
    return <Chip label={config.label} color={config.color} size="small" />;
};

// Formata um valor booleano como "Sim" ou "Não"
const formatBoolean = (value: boolean) => {
    return value
        ? <Chip label="Sim" color="success" size="small" variant="outlined" />
        : <Chip label="Não" color="error" size="small" variant="outlined" />;
}

// Mostra um valor ou um texto padrão para nulos/vazios
const displayValue = (value: string | null) => {
    if (!value) return <Typography component="span" sx={{ color: 'grey.600', fontStyle: 'italic' }}>Não informado</Typography>;
    return value;
}

// Componente para criar uma linha de Rótulo + Valor
const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <>
        <Grid size={12} >
            <Typography variant="subtitle2" component="p" sx={{ fontWeight: 'bold' }}>{label}:</Typography>
        </Grid>
        <Grid size={12}>
            {typeof children === 'string' ? <Typography variant="body2">{children}</Typography> : children}
        </Grid>
    </>
);

export default function OperationDetailsModal({ open, onClose, data }: ModalProps) {
    if (!data) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Detalhes da Operação: <strong>{data.identificadorNavio}</strong>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Informações Gerais</Typography>
                    <Grid container spacing={1.5}>
                        <InfoRow label="Navio">{data.identificadorNavio}</InfoRow>
                        <InfoRow label="Armador">{data.nomeArmador}</InfoRow>
                        <InfoRow label="Agência">{data.nomeAgencia}</InfoRow>
                        <InfoRow label="Tipo de Navio">{data.tipoNavio}</InfoRow>
                        <InfoRow label="Origem">{data.origemNavio}</InfoRow>
                        <InfoRow label="Destino">{data.destinoNavio}</InfoRow>
                        <InfoRow label="Status da Operação">{renderStatusChip(data.statusOperacao)}</InfoRow>
                    </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Prazos e Previsões</Typography>
                    <Grid container spacing={1.5}>
                        <InfoRow label="Previsão de Chegada">{formatDate(data.dataPrevisaoChegada)}</InfoRow>
                        <InfoRow label="Previsão de Saída">{formatDate(data.dataPrevisaoSaida)}</InfoRow>
                        <InfoRow label="Envio de Informações">{formatDate(data.dataEnvioInformacoes)}</InfoRow>
                    </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                    <Typography variant="h6" gutterBottom>Status Detalhado</Typography>
                    <Grid container spacing={1.5}>
                        <InfoRow label="Manifesto Entregue">{formatBoolean(data.manifestoEntregue)}</InfoRow>
                        <InfoRow label="Status Documentação">{renderStatusChip(data.statusDocumentacao)}</InfoRow>
                        <InfoRow label="Pendências">{displayValue(data.pendencias)}</InfoRow>
                        <InfoRow label="Status Sanitário">{renderStatusChip(data.statusSanitario)}</InfoRow>
                        <InfoRow label="Inconformidades">{displayValue(data.inconformidades)}</InfoRow>
                        <InfoRow label="Status Autorização">{renderStatusChip(data.statusAutorizacao)}</InfoRow>
                        <InfoRow label="Motivo da Recusa">{displayValue(data.motivoRecusa)}</InfoRow>
                        <InfoRow label="Observações">{displayValue(data.observacoes)}</InfoRow>
                    </Grid>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}
