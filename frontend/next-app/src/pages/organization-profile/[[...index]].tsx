import { Flex, useColorModeValue } from '@chakra-ui/react';
import { OrganizationProfile } from '@clerk/nextjs';

const OrganizationProfilePage = (): JSX.Element => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <OrganizationProfile routing="path" path="/organization-profile" />
    </Flex>
  );
};

export default OrganizationProfilePage;
