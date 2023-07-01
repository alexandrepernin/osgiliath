import { IconType } from 'react-icons';

import { HiCalendar, HiHome, HiUserGroup } from 'react-icons/hi';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Employees', icon: HiUserGroup },
  { name: 'Dashboard', icon: HiHome },
  { name: 'Leaves', icon: HiCalendar },
];
