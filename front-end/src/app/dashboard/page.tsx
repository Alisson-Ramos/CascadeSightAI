'use client';

import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Card, CardContent, Chip, Collapse, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import NavTitle from '@/components/layout/PagesHeader';
import { CheckCircleOutlineIcon, ExpandMoreIcon, WavesIcon } from '@/theme/icons';
import { useTheme } from '@mui/material/styles';
import { ShipData } from '@/interfaces/ShipData';
import { statusConfig } from '@/types/Status';
import { redirect, useSearchParams } from 'next/navigation';
import CustomModal from '@/components/shared/modals/CustomModal';
import { getDashboard } from '@/service/dashboardService';
import { ReportType } from '@/types/reportType';

// Tipos para as props do componente
interface ShipStatusCardProps {
  shipData: ShipData;
  expanded: boolean;
  onClick: () => void;
}

export function ShipStatusCard({ shipData, expanded, onClick }: ShipStatusCardProps) {
  const { shipName, shipType, status, statusLabel, issues, recommendations } = shipData;
  const config = statusConfig[status];
  const hasMultipleIssues = issues.length > 1;

  const tooltipContent = (
    <Stack spacing={0.5}>
      {issues.map((issue, index) => (
        <Typography key={index} variant="caption">
          <strong>{issue.authority}:</strong> {issue.reason}
        </Typography>
      ))}
    </Stack>
  );

  return (
    <Card sx={{ mb: 2, borderRadius: 2.5, boxShadow: 2, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
      <CardContent onClick={onClick} sx={{ p: 1.5, '&:last-child': { pb: 1.5 }, cursor: 'pointer' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <WavesIcon color="primary" sx={{ fontSize: 28 }} />
            <Stack>
              <Typography variant="body1" fontWeight="bold" lineHeight={1.2}>
                {shipName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {shipType}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title={tooltipContent} arrow>
              <Chip
                icon={config.icon}
                label={hasMultipleIssues ? `${statusLabel} (${issues.length})` : statusLabel}
                color={config.color as "error" | "warning" | "info" | "default" | "primary" | "secondary" | "success"}
                variant="filled"
                size="small"
              />
            </Tooltip>
            {/* ALTERAÇÃO: Adicionado ícone de expansão com animação */}
            <ExpandMoreIcon
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </Stack>
        </Stack>
      </CardContent>

      {/* ALTERAÇÃO: Adicionada a área de colapso com as recomendações */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ p: 2, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" fontSize="1.1rem" fontWeight="bold" gutterBottom>
            Análise e Ação Recomendada
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {recommendations.summary}
          </Typography>
          <List dense>
            {recommendations.actions.map((action, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleOutlineIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={action} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Collapse>
    </Card>
  );
}

const shipsData: ShipData[] = [
  {
    id: 'MAERSK-CANCEL-007',
    shipName: 'MAERSK-CANCEL-007',
    shipType: 'Porta-Contêineres',
    status: 'error', statusLabel: 'Cancelado',
    issues: [
      { authority: 'Agencia-Maritima', reason: 'Irregularidade na inspeção de segurança' },
      { authority: 'Receita-Federal', reason: 'Carga não rastreável e sem conferência física' },
    ],
    recommendations: {
      summary: 'Operação bloqueada por múltiplas falhas críticas. Risco de multa e inclusão em lista de observação.',
      actions: [
        'Notificar imediatamente o agente marítimo sobre o cancelamento.',
        'Iniciar processo administrativo para regularização da carga.',
      ],
    },
  },
  {
    id: 'MSC-DELAY-006',
    shipName: 'MSC-DELAY-006',
    shipType: 'Graneleiro',
    status: 'warning', statusLabel: 'Atrasado',
    issues: [{ authority: 'Anvisa', reason: 'Foco de mosquitos.' }, { authority: 'Capitania', reason: 'Problema com carta náutica.' }],
    recommendations: {
      summary: 'Atraso previsto de 10 horas devido a pendências. Risco de efeito cascata nas próximas atracações.',
      actions: [
        'Submeter com urgência o novo manifesto à Receita Federal.',
        'Contratar serviço de dedetização certificado pela Anvisa.',
      ],
    },
  },
];

// ------------------------------------------------------
// Main Component
// ------------------------------------------------------
export default function Dashboard() {
  const theme = useTheme();
  const [parsedShips, setParsedShips] = React.useState<ShipData[]>([]);
  const [expandedCardId, setExpandedCardId] = React.useState<string | null>(null);
  const handleCardClick = (shipId: string) => {
    setExpandedCardId(expandedCardId === shipId ? null : shipId);
  };
  React.useEffect(() => {
    const fetchDashboard = async () => {
      const uuid = localStorage.getItem('uuid') || '' || undefined;
      if (uuid && uuid != undefined && uuid != '') {
        const jsonDataFromAPI: ReportType = await getDashboard(uuid);
        setParsedShips(JSON.parse(jsonDataFromAPI.description));
        console.log("Dados recebidos da API:", jsonDataFromAPI);
      }
    };
    fetchDashboard();
  }, [parsedShips]);

  return (
    <Grid container>
      {/* HEADER */}
      <Grid size={12} spacing={2}>
        <NavTitle autorefresh={false} />
        <Typography variant="h5" fontWeight={700}>Painel de Pendências</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
      </Grid>
      {/* PAINEIS */}

      <Grid container size={12} spacing={2}>
        {/* PENDÊNCIAS EM GERAL, ORDENDAS POR GRAVIDADE */}
        <Grid size={12} spacing={2}>
          {parsedShips.map((ship) => (
            <ShipStatusCard
              key={ship.id}
              shipData={ship}
              expanded={expandedCardId === ship.id}
              onClick={() => handleCardClick(ship.id)}
            />
          ))}
        </Grid>
      </Grid>

    </Grid >
  );
}
