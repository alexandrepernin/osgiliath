import { extendTheme } from '@chakra-ui/react';

const brand = {
  menu: {
    background: '#052040',
    hovered: '#223954',
    selected: '#485B70',
    textColor: '#95A3B2',
  },
  buttons: {
    color: '#0f6fde',
    hovered: '#2f7de2',
  },
};

export const theme = extendTheme({
  colors: {
    brand,
  },
});
