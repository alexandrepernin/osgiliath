'use client';

import {
  Avatar,
  Box,
  Heading,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { BackToLink } from 'components/BackToLink';
import { PersonalInformation } from 'components/PersonalInformation';
import { SidebarWithHeader } from 'components/Sidebar';
import { Pages } from 'constants/pages';

export const EmployeeDetailPage = (): JSX.Element => {
  return (
    <>
      <SidebarWithHeader menuIndex={1}>
        <VStack align="flex-start" spacing="4" padding="4">
          <BackToLink text="Back to employees" href={Pages.EMPLOYEES} />
          <Heading size="md" marginBottom="6" marginLeft="4" marginTop="4">
            <HStack>
              <Avatar
                size="md"
                backgroundColor="brand.avatar.background"
                color="brand.avatar.textColor"
                name="Alexandre Pernin"
                src={undefined}
                marginRight="2"
              />
              <Box>Alexandre Pernin</Box>
            </HStack>
          </Heading>
        </VStack>
        <Tabs position="relative" isLazy={true} variant="line">
          <TabList>
            <Tab marginLeft="3">Personal information</Tab>
            <Tab>Payment</Tab>
            <Tab>Contract</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="0.5px" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <PersonalInformation />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SidebarWithHeader>
    </>
  );
};
