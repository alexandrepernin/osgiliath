'use client';

import { Flex, Spinner } from '@chakra-ui/react';

export const Loader = (): JSX.Element => (
  <Flex minH="70vh" align="center" justify="center" bg="brand.page.background">
    <Spinner
      thickness="3px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#223954"
      size="xl"
    />
  </Flex>
);
