import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Pages } from 'constants/pages';

const SignUp = (): JSX.Element => {
  const router = useRouter();
  const user = useUser();
  const [ssr, setSsr] = useState(true);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) {
      void router.replace(Pages.HOME);
    }
  }, [user, router]);

  useEffect(() => {
    setSsr(false);
  }, []);

  if (!user && !ssr) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Stack
          spacing={8}
          mx="auto"
          maxW="lg"
          py={12}
          px={6}
          bg="white"
          borderRadius="30px"
        >
          <Stack align="center">
            <Heading fontSize="4xl">Sign up to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Auth
            supabaseClient={supabaseClient}
            providers={['google']}
            redirectTo={process.env.NEXT_PUBLIC_URL ?? ''}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#404040',
                    brandAccent: '#52525b',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_up: {
                  social_provider_text: 'Sign up with Google',
                },
                sign_in: {
                  social_provider_text: 'Sign in with Google',
                },
              },
            }}
            view="sign_up"
            theme="default"
            showLinks={true}
          />
        </Stack>
      </Flex>
    );
  }

  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: Pages.HOME,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignUp;
