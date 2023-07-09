'use client';

import { Flex } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import { SignUp } from '@clerk/nextjs';

const Page = (): JSX.Element => (
  <Flex
    minH="100vh"
    align="center"
    justify="center"
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <SignUp />
  </Flex>
);

export default Page;
