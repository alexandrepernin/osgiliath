import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Pages } from 'constants/pages';

interface Return {
  logout: () => Promise<void>;
}

//to do : implement logout function
export const useLogout = (): Return => {
  const router = useRouter();

  const logout = useCallback(async () => {
    await Promise.resolve();
    await router.push(Pages.SIGNIN);
  }, [router]);

  return { logout };
};
