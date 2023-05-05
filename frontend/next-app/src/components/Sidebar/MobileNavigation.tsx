import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { User } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';

import { useLogout } from 'hooks/useLogout';
import { CompanyLogo } from 'icons';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: User;
}
export const MobileNav = ({
  onOpen,
  user,
  ...rest
}: MobileProps): JSX.Element => {
  const { logout } = useLogout();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box display={{ base: 'flex', md: 'none' }}>
        <Image priority src={CompanyLogo as string} alt="Company Logo" />
      </Box>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  name={user.email}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  src={user.user_metadata.picture ?? ''}
                  backgroundColor="gray.100"
                  getInitials={(name: string) => name[0] ?? ''}
                  size="md"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.user_metadata.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="white" borderColor="gray.200">
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => void logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
