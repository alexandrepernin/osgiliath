import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
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
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleSignin } from 'hooks/useGoogleSignin';

const Page = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const { signinWithGoogle } = useGoogleSignin();
  const { handleInputChange, onSubmit, formValues } = useSignup();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up to your account
          </Heading>
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
            <form onSubmit={event => void onSubmit(event)}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formValues.password}
                      onChange={handleInputChange}
                      placeholder="Password"
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
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg="gray.700"
                    color="white"
                    _hover={{
                      bg: 'gray.600',
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align="center">
                    Already a user?{' '}
                    <Link as={NextLink} color="gray.600" href={Pages.SIGNIN}>
                      Login
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
