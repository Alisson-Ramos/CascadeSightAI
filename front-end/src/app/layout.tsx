'use client';

import * as React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
