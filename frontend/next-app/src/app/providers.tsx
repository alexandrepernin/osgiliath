'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'constants/theme';

export const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
};
