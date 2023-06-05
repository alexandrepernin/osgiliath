import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
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
  useColorModeValue,
} from '@chakra-ui/react';
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
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>();

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

export default Page;
