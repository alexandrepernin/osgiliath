import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignIn = (): JSX.Element => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const color = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    if (user) {
      void router.replace('/');
    }
  }, [user, router]);

  if (!user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={color}>
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Auth
            supabaseClient={supabaseClient}
            providers={['google']}
            redirectTo="http://localhost:3000/"
            magicLink={false}
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
            theme="default"
          />
        </Stack>
      </Flex>
    );
  }

  return <></>;
};

export default SignIn;
