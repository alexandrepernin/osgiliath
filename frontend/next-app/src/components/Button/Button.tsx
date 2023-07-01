import { Button as ChakraButton } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface Props {
  onClick: () => void;
  leftIcon?: React.ReactElement<IconType>;
  text?: string;
}

export const Button = ({ onClick, leftIcon, text }: Props): JSX.Element => {
  return (
    <ChakraButton
      leftIcon={leftIcon}
      px="3"
      bg="brand.buttons.color"
      color="white"
      fontSize="sm"
      _hover={{
        bg: 'brand.buttons.hovered',
      }}
      onClick={onClick}
    >
      {text}
    </ChakraButton>
  );
};
