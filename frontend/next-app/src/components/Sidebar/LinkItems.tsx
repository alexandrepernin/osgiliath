import { IconType } from 'react-icons';
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Employees', icon: FiCompass },
  { name: 'Dashboard', icon: FiHome },
  { name: 'Planning', icon: FiTrendingUp },
  { name: 'Payroll', icon: FiStar },
  { name: 'Company', icon: FiSettings },
];
