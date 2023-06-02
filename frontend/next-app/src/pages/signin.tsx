import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import NextLink from 'next/link';

import { useSignin } from 'hooks/useSignin';
import { useGoogleSignin } from 'hooks/useGoogleSignin';
import { Pages } from 'constants/pages';
import { useForm } from 'react-hook-form';

const Page = (): JSX.Element => {
  const { signinWithGoogle } = useGoogleSignin();
  const { onSubmit } = useSignin();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>();

  console.log({ errors });

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
            to enjoy all of our cool features ✌️
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
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  required
                  type="email"
                  {...register('email', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  type="password"
                  {...register('password', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link
                    as={NextLink}
                    color="gray.600"
                    href={Pages.FORGOT_PASSWORD}
                  >
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  bg="gray.700"
                  color="white"
                  _hover={{
                    bg: 'gray.600',
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
                <Stack>
                  <Text align="center">
                    Don&apos;t have an account?{' '}
                    <Link as={NextLink} color="gray.600" href={Pages.SIGNUP}>
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Page;
