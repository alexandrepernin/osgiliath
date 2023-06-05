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
  InputGroup,
  InputRightElement,
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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface SigninFormData {
  email: string;
  password: string;
}

const Page = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const { signinWithGoogle } = useGoogleSignin();
  const { onSubmit, customErrorMessage } = useSignin();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>();

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
              <FormControl
                id="email"
                isInvalid={errors.email?.message !== undefined ? true : false}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: 'This field is required',
                  })}
                />

                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={
                  errors.password?.message !== undefined ? true : false
                }
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'This field is required',
                      minLength: {
                        value: 8,
                        message:
                          'Your password should be at least 8 characters',
                      },
                    })}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                <Stack direction={{ base: 'column' }} align="start">
                  <Button
                    bg="gray.700"
                    color="white"
                    width={{ base: 'full' }}
                    _hover={{
                      bg: 'gray.600',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Sign in
                  </Button>
                  <Text color="red.500" fontSize="sm">
                    {customErrorMessage}
                  </Text>
                </Stack>
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
