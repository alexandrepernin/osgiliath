import { Box, BoxProps, CloseButton, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import { CompanyLogo } from 'icons';

import { LinkItems } from './LinkItems';
import { NavigationItem } from './NavigationItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  menuIndex?: number;
}

export const SidebarContent = ({
  menuIndex,
  onClose,
  ...rest
}: SidebarProps): JSX.Element => {
  return (
    <Box
      transition="3s ease"
      bg="brand.menu.background"
      color="brand.menu.textColor"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="2"
        mb="4"
        justifyContent="space-between"
      >
        <Image priority src={CompanyLogo} alt="Company Logo" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => (
        <NavigationItem
          key={link.name}
          icon={link.icon}
          selected={index === menuIndex}
        >
          {link.name}
        </NavigationItem>
      ))}
    </Box>
  );
};
