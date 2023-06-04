import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
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
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const { onSubmit } = useForgotPassword();

  return (
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default Page;
