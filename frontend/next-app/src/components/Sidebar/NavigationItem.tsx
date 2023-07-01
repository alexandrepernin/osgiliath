import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { BrandIdentityColors } from 'constants/colors';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface NavigationItemProps extends FlexProps {
  selected: boolean;
  icon?: IconType;
  children: ReactNode;
}

export const NavigationItem = ({
  selected,
  icon,
  children,
  ...rest
}: NavigationItemProps): JSX.Element => {
  return (
    <Link
      href="#"
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
        backgroundColor={
          selected ? BrandIdentityColors.menu.selected : 'transparent'
        }
        color={selected ? 'gray.100' : 'inherit'}
        _hover={{
          bg: selected
            ? BrandIdentityColors.menu.selected
            : BrandIdentityColors.menu.hovered,
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
