import { DoNotDisturbOnIcon, EmergencyIcon, HourglassTopIcon, WarningAmberIcon } from "@/theme/icons";

export type Status = 'error' | 'warning' | 'info' | 'emergency';

export const statusConfig = {
    error: { color: 'error', icon: <DoNotDisturbOnIcon sx={{ fontSize: 16 }} /> },
    warning: { color: 'warning', icon: <WarningAmberIcon sx={{ fontSize: 16 }} /> },
    info: { color: 'info', icon: <HourglassTopIcon sx={{ fontSize: 16 }} /> },
    emergency: { color: 'error', icon: <EmergencyIcon sx={{ fontSize: 16 }} /> },
};
