import { Stack } from '@chakra-ui/react';

import { NAV_ITEMS } from 'constants/navItems';

import { MobileNavItem } from './MobileNavItem';

export const MobileNav = (): JSX.Element => {
  return (
    <Stack bg="white" p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};
