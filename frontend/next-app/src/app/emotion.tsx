'use client';

import { CacheProvider } from '@emotion/react';
import { MantineProvider, useEmotionCache } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';

const RootStyleRegistry = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      // eslint-disable-next-line risxss/catch-potential-xss-react
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </CacheProvider>
  );
};

export default RootStyleRegistry;
