import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useCallback, useState } from 'react';
import { resetPassword } from 'services/api-client/resetPassword';

interface Props {
  token: string | null;
}

const Page = ({ token }: Props): JSX.Element => {
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await resetPassword({ password, token });
    },
    [password, token],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target as { value: string };
      setPassword(value);
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
            Enter new password
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              required
              type="password"
              name="password"
              value={password}
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
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async context => {
  await Promise.resolve();
  const { query } = context;
  const { token } = query;

  return {
    props: {
      token: typeof token !== 'string' ? null : token,
    },
  };
};
