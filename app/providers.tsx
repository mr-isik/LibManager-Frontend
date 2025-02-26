'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          primaryColor: 'blue',
          fontFamily: 'Inter, sans-serif',
          defaultRadius: 'md',
          colors: {
            dark: [
              '#C1C2C5',
              '#A6A7AB',
              '#909296',
              '#5C5F66',
              '#373A40',
              '#2C2E33',
              '#25262B',
              '#1A1B1E',
              '#141517',
              '#101113',
            ],
          },
        }}
      >
        <Notifications />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
} 