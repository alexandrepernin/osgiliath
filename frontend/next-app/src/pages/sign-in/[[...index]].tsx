import { SignIn } from '@clerk/nextjs';
import { Flex, useColorModeValue } from '@chakra-ui/react';

const Page = (): JSX.Element => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <SignIn />
    </Flex>
  );
};

export default Page;
