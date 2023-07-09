import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { useState } from 'react';
import { DateInput } from 'components/DateInput';

export const NewLeaveForm = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <form>
      <Stack spacing={8} mx="auto" maxW="lg">
        <Stack spacing={4}>
          <HStack width="100%">
            <Box width="60%">
              <FormControl id="startDate">
                <FormLabel fontSize="sm">Start date</FormLabel>
                <DateInput value={startDate} setValue={setStartDate} />
              </FormControl>
            </Box>
            <Box width="40%">
              <FormControl id="jobTitle">
                <FormLabel fontSize="sm">am / pm</FormLabel>
                <Select
                  size="md"
                  variant="outline"
                  fontSize="sm"
                  borderColor="gray.300"
                  _focusVisible={{
                    border: '1px solid #4299E1;',
                    outline: 'none',
                  }}
                >
                  <option value="full">Full day</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                </Select>
              </FormControl>
            </Box>
          </HStack>
          <HStack width="100%">
            <Box width="60%">
              <FormControl id="endDate">
                <FormLabel fontSize="sm">End date</FormLabel>
                <DateInput value={endDate} setValue={setEndDate} />
              </FormControl>
            </Box>
            <Box width="40%">
              <FormControl id="jobTitle">
                <FormLabel fontSize="sm">am / pm</FormLabel>
                <Select
                  size="md"
                  variant="outline"
                  fontSize="sm"
                  borderColor="gray.300"
                  _focusVisible={{
                    border: '1px solid #4299E1;',
                    outline: 'none',
                  }}
                >
                  <option value="full">Full day</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                </Select>
              </FormControl>
            </Box>
          </HStack>
          <HStack width="100%">
            <FormControl id="leaveType">
              <FormLabel fontSize="sm">Leave type</FormLabel>
              <Select
                size="md"
                variant="outline"
                fontSize="sm"
                borderColor="gray.300"
                _focusVisible={{
                  border: '1px solid #4299E1;',
                  outline: 'none',
                }}
              >
                <option value="rtt">RTT</option>
                <option value="cp">Congé payé</option>
              </Select>
            </FormControl>
          </HStack>
        </Stack>
        <Button type="submit" text="Confirm" isLoading={undefined} />
      </Stack>
    </form>
  );
};
