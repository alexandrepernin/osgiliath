import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Pages } from 'constants/pages';

interface Return {
  logout: () => Promise<void>;
}

export const useLogout = (): Return => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const logout = useCallback(async () => {
    await supabaseClient.auth.signOut();
    await router.push(Pages.SIGNIN);
  }, [router, supabaseClient]);

  return { logout };
};
