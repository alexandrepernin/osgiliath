import { useOrganization } from '@clerk/nextjs';
import { useMemo } from 'react';

export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export const useRole = (): Role | null => {
  const { membership, isLoaded } = useOrganization();

  const role = useMemo(() => {
    if (!isLoaded) {
      return null;
    }
    if (!membership) {
      return null;
    }

    return membership.role as Role;
  }, [membership, isLoaded]);

  return role;
};
