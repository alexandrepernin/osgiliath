import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';

const App = ({ Component, ...pageProps }: AppProps): JSX.Element => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        elements: {
          formButtonPrimary: {
            backgroundColor: 'black',
            '&:hover, &:focus, &:active': {
              backgroundColor: 'gray',
            },
          },
          organizationPreviewMainIdentifier: {
            fontWeight: 'light',
          },
          membersPageInviteButton: {
            backgroundColor: 'black',
            '&:hover, &:focus, &:active': {
              backgroundColor: 'gray',
            },
          },
        },
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default App;
