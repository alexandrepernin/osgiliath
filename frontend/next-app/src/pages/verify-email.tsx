import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const Page = (): JSX.Element => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w="full"
        maxW="sm"
        bg={useColorModeValue('white', 'gray.700')}
        rounded="xl"
        boxShadow="lg"
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Please check your mail
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          We have sent you a verification email
        </Center>
        {/* <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}
        >
        </Center> */}
        <Stack spacing={6}>
          <Button
            bg="gray.700"
            color="white"
            _hover={{
              bg: 'gray.600',
            }}
          >
            Resend
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Page;
