'use client';

import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { NewLeaveModal } from 'components/NewLeaveModal';
import { SidebarWithHeader } from 'components/Sidebar';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export const DashboardPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SidebarWithHeader menuIndex={0}>
      <Box padding="4">
        <HStack justify="space-between">
          <Heading as="h2" size="lg" fontWeight="medium">
            Hello Alexandre,
          </Heading>
          <Button
            onClick={onOpen}
            leftIcon={<BsFillPlusCircleFill />}
            text="Leave"
          />
        </HStack>
        <HStack mb="10">
          <Text fontSize="md">Welcome to Malibou!</Text>
        </HStack>
        <HStack height="12" spacing="10">
          <HStack>
            <Avatar
              size="md"
              backgroundColor="brand.avatar.background"
              color="brand.avatar.textColor"
              name="Alexandre Pernin"
              src={undefined}
              marginRight="2"
            />
            <VStack align="flex-start" justify="center" spacing="0">
              <Text fontSize="sm" fontWeight="semibold">
                Alexandre
              </Text>
              <Text fontSize="sm" color="gray.600">
                Ingénieur développeur
              </Text>
            </VStack>
          </HStack>
          <Divider orientation="vertical" borderColor="gray.600" />
          <VStack align="flex-start" justify="center" spacing="0">
            <Text fontSize="sm" fontWeight="semibold">
              Start date
            </Text>
            <Text fontSize="sm" color="gray.600">
              21/09/2020
            </Text>
          </VStack>
          <VStack align="flex-start" justify="center" spacing="0">
            <Text fontSize="sm" fontWeight="semibold">
              Contract type
            </Text>
            <Text fontSize="sm" color="gray.600">
              CDI
            </Text>
          </VStack>
        </HStack>
      </Box>
      <NewLeaveModal isOpen={isOpen} onClose={onClose} />
    </SidebarWithHeader>
  );
};
