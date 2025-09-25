'use client';

import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from '@/components/layout/AppNavBar';
import { AppNavBarRoutes } from '@/components/_utils/NavigationRoutes';
import theme from '@/theme/theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>

        {/* Sidebar recebe o estado open e a função para alterar */}
        <Sidebar navigation={AppNavBarRoutes} />

        {/* Conteúdo principal da página */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            transition: 'margin 0.3s',
            marginLeft: `15px`,
            marginRight: `15px`,
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
