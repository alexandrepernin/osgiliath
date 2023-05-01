import {
  createServerSupabaseClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';

import { SidebarWithHeader } from 'components/Sidebar';
import { Pages } from 'constants/pages';

interface Props {
  user: User;
}

const Home = ({ user }: Props): JSX.Element => {
  return (
    <SidebarWithHeader user={user}>
      <></>
    </SidebarWithHeader>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: Pages.SIGNIN,
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default Home;
