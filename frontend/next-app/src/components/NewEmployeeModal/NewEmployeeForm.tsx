import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNewEmployeeForm } from './useNewEmployeeForm';
import { Button } from 'components/Button';
import { useState } from 'react';
import { DateInput } from 'components/DateInput';

interface NewEmployeeFormData {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  startDate: string;
}

export const NewEmployeeForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewEmployeeFormData>();
  const { onSubmit } = useNewEmployeeForm();
  const [value, setValue] = useState<Date | null>(null);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8} mx="auto" maxW="lg">
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName">
                <FormLabel fontSize="sm">First Name</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  {...register('firstName', {
                    required: 'This field is required',
                  })}
                />
                <FormErrorMessage fontSize="xs">
                  {errors.firstName?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel fontSize="sm">Last Name</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  {...register('lastName', {
                    required: 'This field is required',
                  })}
                />
                <FormErrorMessage fontSize="xs">
                  {errors.lastName?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </HStack>
          <FormControl
            id="email"
            isInvalid={errors.email?.message !== undefined ? true : false}
          >
            <FormLabel fontSize="sm">Email address</FormLabel>
            <Input
              fontSize="sm"
              type="email"
              {...register('email', {
                required: 'This field is required',
              })}
            />
            <FormErrorMessage fontSize="xs">
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <HStack width="100%">
            <Box width="50%">
              <FormControl id="startDate">
                <FormLabel fontSize="sm">Start date</FormLabel>
                <DateInput value={value} setValue={setValue} />
              </FormControl>
            </Box>
            <Box width="50%">
              <FormControl id="jobTitle">
                <FormLabel fontSize="sm">Job title</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  {...register('jobTitle', {
                    required: 'This field is required',
                  })}
                />
                <FormErrorMessage fontSize="xs">
                  {errors.jobTitle?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </HStack>
        </Stack>
        <Button type="submit" text="Add employee" isLoading={isSubmitting} />
      </Stack>
    </form>
  );
};
