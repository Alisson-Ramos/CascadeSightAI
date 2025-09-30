
import { api } from "@/libs/apiClient";
import { ReportType } from "@/types/reportType";

export const getDashboard = async (uuid: string): Promise<ReportType> => {
    console.log("Enviando para a API:", uuid);
    return await api.get<ReportType>('/webhook/dashboard', { params: { uuid: uuid } });
};
