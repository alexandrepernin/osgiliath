import { useOrganization } from '@clerk/nextjs';
import { useMemo } from 'react';

export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export const useRole = (): Role | null => {
  const organization = useOrganization();

  console.log({ organization });

  const role = useMemo(() => {
    console.log({ organization });

    if (!organization.isLoaded) {
      return null;
    }
    if (!organization.membership) {
      return null;
    }

    return organization.membership.role as Role;
  }, [organization]);

  return role;
};
