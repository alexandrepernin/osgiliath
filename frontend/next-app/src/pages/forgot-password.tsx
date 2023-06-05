import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForgotPassword } from 'hooks/useForgotPassword';
import { useForm } from 'react-hook-form';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const Page = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordFormData>();

  const { onSubmit } = useForgotPassword();

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
            Forgot your password?
          </Heading>
          <Text fontSize={{ base: 'sm', sm: 'md' }} color="gray.800">
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl
            id="email"
            isInvalid={errors.email?.message !== undefined ? true : false}
          >
            <Input
              type="email"
              {...register('email', {
                required: 'This field is required',
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg="gray.700"
              color="white"
              _hover={{
                bg: 'gray.600',
              }}
              type="submit"
              isLoading={isSubmitting}
            >
              Request Reset
            </Button>
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
        Please check your mailbox
      </Heading>
      <Text color="gray.500">
        We have sent you an email with a link to reset your password.
      </Text>
    </Box>
  );
};

export default Page;
