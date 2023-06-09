import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface NavigationItemProps extends FlexProps {
  selected: boolean;
  icon?: IconType;
  children: ReactNode;
  path: string;
}

export const NavigationItem = ({
  selected,
  icon,
  children,
  path,
  ...rest
}: NavigationItemProps): JSX.Element => {
  return (
    <Link
      href={path}
      as={NextLink}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        px="4"
        py="3"
        mx="0"
        role="group"
        cursor="pointer"
        backgroundColor={selected ? 'brand.menu.selected' : 'transparent'}
        color={selected ? 'gray.100' : 'inherit'}
        _hover={{
          bg: selected ? 'brand.menu.selected' : 'brand.menu.hovered',
          color: 'gray.100',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'gray.100',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
