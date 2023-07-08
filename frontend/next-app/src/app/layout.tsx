import RootStyleRegistry from './emotion';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Malibou',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏄</text></svg>"
          />
        </head>
        <body className={inter.className}>
          <RootStyleRegistry>
            <Providers>{children}</Providers>
          </RootStyleRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
