import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { MobileNavigation } from './MobileNavigation';
import { SidebarContent } from './SidebarContent';

export const SidebarWithHeader = ({
  menuIndex,
  children,
}: {
  menuIndex: number;
  children: ReactNode;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        menuIndex={menuIndex}
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNavigation onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
};
