import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const App = ({
  Component,
  // @ts-ignore test next js auth
  pageProps: { session: nextAuthSession, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={nextAuthSession}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default App;
