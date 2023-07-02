import { Pages } from 'constants/pages';
import { IconType } from 'react-icons';

import { HiCalendar, HiHome, HiUserGroup } from 'react-icons/hi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: Pages | '#';
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Employees', icon: HiUserGroup, path: Pages.HOME },
  { name: 'Dashboard', icon: HiHome, path: '#' },
  { name: 'Leaves', icon: HiCalendar, path: '#' },
];
