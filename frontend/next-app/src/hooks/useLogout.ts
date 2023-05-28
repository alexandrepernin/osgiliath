import { signOut } from 'next-auth/react';
import { useCallback } from 'react';

import { Pages } from 'constants/pages';

interface Return {
  logout: () => Promise<void>;
}

export const useLogout = (): Return => {
  const logout = useCallback(async () => {
    await signOut({ callbackUrl: Pages.SIGNIN });
  }, []);

  return { logout };
};
