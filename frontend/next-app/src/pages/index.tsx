import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { SidebarWithHeader } from 'components/Sidebar';
import { Pages } from 'constants/pages';
import { prisma } from 'services/database/prisma';

interface Props {
  homes: string;
}

const Home = ({ homes }: Props): JSX.Element => {
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
        <div>loading...</div>
      ) : (
        <SidebarWithHeader>
          <>{JSON.stringify(homes)}</>
          <>{JSON.stringify(session.user ?? '')}</>
        </SidebarWithHeader>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const homes = await prisma.home.findMany();

  return {
    props: {
      homes: JSON.stringify(homes),
    },
  };
};

export default Home;
