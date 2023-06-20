import { Box, Flex, FlexProps, HStack, IconButton } from '@chakra-ui/react';
import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { FiBell, FiMenu } from 'react-icons/fi';

import { CompanyLogo } from 'icons';
import { Pages } from 'constants/pages';
import { Role, useRole } from 'hooks/useRole';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps): JSX.Element => {
  const role = useRole();

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
        <Image priority src={CompanyLogo} alt="Company Logo" />
      </Box>
      <HStack spacing={{ base: '0', md: '2' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="baseline">
          {role === Role.ADMIN && (
            <Box marginRight="2">
              <OrganizationSwitcher hidePersonal={true} />
            </Box>
          )}

          <SignedIn>
            <UserButton
              afterSignOutUrl={Pages.SIGNIN}
              appearance={{
                layout: {
                  shimmer: true,
                },
              }}
            />
          </SignedIn>
        </Flex>
      </HStack>
    </Flex>
  );
};
