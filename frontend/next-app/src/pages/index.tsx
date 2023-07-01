import { GetServerSideProps } from 'next';

import { SidebarWithHeader } from 'components/Sidebar';
import { EmployeeListing } from 'components/EmployeeListing';
import { Button, Stack } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

const Home = (): JSX.Element => {
  return (
    <SidebarWithHeader menuIndex={0}>
      <Stack direction="row" spacing={4} justify="flex-end" marginBottom="3">
        <Button leftIcon={<FiPlus />} colorScheme="teal" variant="outline">
          Employee
        </Button>
      </Stack>
      <EmployeeListing />
    </SidebarWithHeader>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.resolve();

  return {
    props: {},
  };
};

export default Home;
