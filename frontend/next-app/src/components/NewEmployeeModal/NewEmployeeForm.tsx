/* eslint-disable complexity */
import {
  Box,
  FormControl,
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
  startDate: Date;
}

export const NewEmployeeForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewEmployeeFormData>();
  const [value, setValue] = useState<Date | null>(null);
  const { onSubmit } = useNewEmployeeForm(value);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8} mx="auto" maxW="lg">
        <Stack spacing={4}>
          <HStack width="100%">
            <Box width="50%">
              <FormControl
                id="firstName"
                isInvalid={
                  errors.firstName?.message !== undefined ? true : false
                }
              >
                <FormLabel fontSize="sm">First Name</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  _focusVisible={
                    errors.firstName?.message === undefined
                      ? {
                          border: '1px solid #4299E1;',
                          outline: 'none',
                        }
                      : undefined
                  }
                  {...register('firstName', {
                    required: 'This field is required',
                  })}
                />
              </FormControl>
            </Box>
            <Box width="50%">
              <FormControl
                id="lastName"
                isInvalid={
                  errors.lastName?.message !== undefined ? true : false
                }
              >
                <FormLabel fontSize="sm">Last Name</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  _focusVisible={
                    errors.lastName?.message === undefined
                      ? {
                          border: '1px solid #4299E1;',
                          outline: 'none',
                        }
                      : undefined
                  }
                  {...register('lastName', {
                    required: 'This field is required',
                  })}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl
            id="email"
            isInvalid={errors.email?.message !== undefined ? true : false}
          >
            <FormLabel fontSize="sm">Email address</FormLabel>
            <Input
              variant="outline"
              fontSize="sm"
              _focusVisible={
                errors.email?.message === undefined
                  ? {
                      border: '1px solid #4299E1;',
                      outline: 'none',
                    }
                  : undefined
              }
              type="email"
              {...register('email', {
                required: 'This field is required',
              })}
            />
          </FormControl>
          <HStack width="100%">
            <Box width="50%">
              {/* To do : handle error message */}
              <FormControl id="startDate">
                <FormLabel fontSize="sm">Start date</FormLabel>
                <DateInput value={value} setValue={setValue} />
              </FormControl>
            </Box>
            <Box width="50%">
              <FormControl
                id="jobTitle"
                isInvalid={
                  errors.jobTitle?.message !== undefined ? true : false
                }
              >
                <FormLabel fontSize="sm">Job title</FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  _focusVisible={
                    errors.jobTitle?.message === undefined
                      ? {
                          border: '1px solid #4299E1;',
                          outline: 'none',
                        }
                      : undefined
                  }
                  {...register('jobTitle', {
                    required: 'This field is required',
                  })}
                />
              </FormControl>
            </Box>
          </HStack>
        </Stack>
        <Button type="submit" text="Add employee" isLoading={isSubmitting} />
      </Stack>
    </form>
  );
};
