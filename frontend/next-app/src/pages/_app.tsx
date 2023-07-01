import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';

const App = ({ Component, ...pageProps }: AppProps): JSX.Element => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        variables: { colorPrimary: '#052040' },
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default App;
