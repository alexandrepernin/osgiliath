import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { forgotPassword } from 'services/api-client/forgotPassword';

const Page = (): JSX.Element => {
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await forgotPassword({ email });
    },
    [email],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as { value: string };
      setEmail(value);
    },
    [],
  );

  return (
    <form onSubmit={event => void handleSubmit(event)}>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg="gray.700"
              color="white"
              _hover={{
                bg: 'gray.600',
              }}
              type="submit"
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default Page;
