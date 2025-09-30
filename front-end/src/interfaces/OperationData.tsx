export interface OperationData {
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
