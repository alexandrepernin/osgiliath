import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

import { Pages } from 'constants/pages';

interface Return {
  signinWithGoogle: () => Promise<void>;
}

export const useGoogleSignin = (): Return => {
  const signinWithGoogle = useCallback(async () => {
    await signIn('google', { callbackUrl: Pages.HOME });
  }, []);

  return { signinWithGoogle };
};
