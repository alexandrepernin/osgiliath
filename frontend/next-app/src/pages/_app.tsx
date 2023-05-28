import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SessionProvider as AuthProvider } from 'next-auth/react';

const App = ({
  Component,
  // @ts-ignore test next js auth
  pageProps: { session: nextAuthSession, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <AuthProvider session={nextAuthSession}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
