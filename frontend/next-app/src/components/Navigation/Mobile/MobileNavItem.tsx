import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { NavItem } from 'types/NavItem';

export const MobileNavItem = ({
  label,
  children,
  href,
}: NavItem): JSX.Element => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color="gray.600">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor="gray.200"
          align="start"
        >
          {children?.map(child => (
            <Link key={child.label} py={2} href={child.href}>
              {child.label}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
