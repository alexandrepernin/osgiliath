'use client';

import { SidebarWithHeader } from 'components/Sidebar';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => (
  <SidebarWithHeader menuIndex={1}>{children}</SidebarWithHeader>
);

export default Layout;
