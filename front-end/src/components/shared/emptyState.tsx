import { Button, Paper, Typography } from "@mui/material";

export const EmptyState: React.FC<{ title: string; subtitle?: string; buttonText?: string; icon?: React.ReactNode; onButtonClick?: () => void }> = ({ title, subtitle, buttonText, icon, onButtonClick  }) => (
  <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'background.default' }}>
    {icon && <div>{icon}</div>}
    <Typography variant="h6" fontWeight={700}>{title}</Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>
    )}
    {buttonText && (
      <Button variant="contained" sx={{ mt: 2 }} onClick={onButtonClick}>{buttonText}</Button>
    )}
  </Paper>
);