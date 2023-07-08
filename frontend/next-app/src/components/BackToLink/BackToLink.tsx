import { HStack, Icon, Link } from '@chakra-ui/react';
import { Pages } from 'constants/pages';
import NextLink from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

interface Props {
  href: Pages;
  text: string;
}

export const BackToLink = ({ href, text }: Props): JSX.Element => {
  return (
    <Link as={NextLink} href={href} color="blue.600">
      <HStack align="center" fontSize="sm">
        <Icon as={FiArrowLeft} />
        <>{text}</>
      </HStack>
    </Link>
  );
};
