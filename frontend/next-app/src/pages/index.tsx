import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { SidebarWithHeader } from 'components/Sidebar';
import { Pages } from 'constants/pages';

const Home = (): JSX.Element => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      void router.push(Pages.SIGNIN);
    },
  });

  return (
    <>
      {status === 'loading' ? (
        <></>
      ) : (
        <SidebarWithHeader>
          <>{JSON.stringify(session.user ?? '')}</>
        </SidebarWithHeader>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.resolve();

  return {
    props: {},
  };
};

export default Home;
