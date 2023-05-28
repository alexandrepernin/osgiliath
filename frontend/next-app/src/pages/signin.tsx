import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { useSignin } from 'hooks/useSignin';
import { useGoogleSignin } from 'hooks/useGoogleSignin';
import { Pages } from 'constants/pages';

const Page = (): JSX.Element => {
  const { signinWithGoogle } = useGoogleSignin();
  const { onSubmit, handleInputChange, formValues } = useSignin();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool <Link color="blue.400">features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <Button
              w="full"
              maxW="md"
              variant="outline"
              leftIcon={<FcGoogle />}
              onClick={() => void signinWithGoogle()}
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>
            <Divider />
            <form onSubmit={event => void onSubmit(event)}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  required
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color="blue.400" href={Pages.FORGOT_PASSWORD}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Page;
