import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { theme } from 'constants/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Malibou</title>
      </Head>
      <ClerkProvider
        {...pageProps}
        appearance={{
          variables: { colorPrimary: '#052040' },
        }}
      >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ClerkProvider>
    </>
  );
};

export default App;
