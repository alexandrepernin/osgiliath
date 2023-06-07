import { CheckCircleIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Pages } from 'constants/pages';
import { useResetPassword } from 'hooks/useResetPassword';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ResetPasswordFormData {
  password: string;
}

const Page = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const { onSubmit, customErrorMessage } = useResetPassword();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ResetPasswordFormData>();

  if (isSubmitSuccessful) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Success />
      </Flex>
    );
  }

  return (
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg="white"
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
          <FormControl
            id="password"
            isInvalid={errors.password?.message !== undefined ? true : false}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Your password should be at least 8 characters',
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
              Reset password
            </Button>
            <Text color="red.500" fontSize="sm">
              {customErrorMessage}
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

const Success = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize="50px" color="green.500" />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Password reset successful
      </Heading>
      <Text color="gray.500" mb="3">
        Please now login with your new credentials
      </Text>
      <Button
        as="a"
        bg="gray.700"
        color="white"
        _hover={{
          bg: 'gray.600',
        }}
        href={Pages.SIGNIN}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default Page;
