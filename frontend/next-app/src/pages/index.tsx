import { GetServerSideProps } from 'next';

import { SidebarWithHeader } from 'components/Sidebar';

const Home = (): JSX.Element => {
  return (
    <SidebarWithHeader>
      <></>
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
