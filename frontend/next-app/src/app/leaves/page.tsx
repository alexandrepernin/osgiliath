'use client';

import { SidebarWithHeader } from 'components/Sidebar';

const Page = async (): Promise<JSX.Element> => {
  await Promise.resolve();

  return <SidebarWithHeader menuIndex={2}>Leaves</SidebarWithHeader>;
};

export default Page;
