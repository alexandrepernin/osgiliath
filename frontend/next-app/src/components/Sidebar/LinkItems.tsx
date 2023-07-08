import { Pages } from 'constants/pages';
import { IconType } from 'react-icons';

import { HiCalendar, HiHome, HiUserGroup } from 'react-icons/hi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: Pages | '#';
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: HiHome, path: Pages.DASHBOARD },
  { name: 'Employees', icon: HiUserGroup, path: Pages.EMPLOYEES },
  { name: 'Leaves', icon: HiCalendar, path: Pages.LEAVES },
];
