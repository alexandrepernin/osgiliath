/* eslint-disable max-lines */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
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
import NextLink from 'next/link';

import { Pages } from 'constants/pages';
import { useSignup } from 'hooks/useSignup';
import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleSignin } from 'hooks/useGoogleSignin';
import { useForm } from 'react-hook-form';

interface SignupFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Page = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const { signinWithGoogle } = useGoogleSignin();
  const { onSubmit, customErrorMessage } = useSignup();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormData>();
  const password = useRef({});
  password.current = watch('password', '');

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign up to your account</Heading>
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
                <Text>Sign up with Google</Text>
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
              <FormControl
                id="password-confirmation"
                isInvalid={
                  errors.passwordConfirmation?.message !== undefined
                    ? true
                    : false
                }
              >
                <FormLabel>Password confirmation</FormLabel>
                <InputGroup>
                  <Input
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    {...register('passwordConfirmation', {
                      required: 'This field is required',
                      validate: value =>
                        value === password.current ||
                        'The passwords do not match',
                    })}
                  />

                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                    >
                      {showPasswordConfirmation ? (
                        <ViewIcon />
                      ) : (
                        <ViewOffIcon />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.passwordConfirmation?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  {' '}
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
                    Sign up
                  </Button>
                  <Text color="red.500" fontSize="sm">
                    {customErrorMessage}
                  </Text>
                </Stack>
                <Stack>
                  <Text align="center">
                    Already a user?{' '}
                    <Link as={NextLink} color="gray.600" href={Pages.SIGNIN}>
                      Sign in
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
