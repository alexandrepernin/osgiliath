import { Flex, useColorModeValue } from '@chakra-ui/react';
import { CreateOrganization } from '@clerk/nextjs';

const CreateOrganizationPage = (): JSX.Element => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <CreateOrganization />
    </Flex>
  );
};

export default CreateOrganizationPage;
