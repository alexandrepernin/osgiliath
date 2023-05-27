/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

const App = ({
  Component,
  // @ts-ignore test next js auth
  pageProps: { session: nextAuthSession, ...pageProps },
}: AppProps<{
  initialSession: Session;
}>): JSX.Element => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <SessionProvider session={nextAuthSession}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </SessionContextProvider>
  );
};

export default App;
