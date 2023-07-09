import { auth } from '@clerk/nextjs';
import { getOrganizationEmployees } from 'backend/services/employee';
import { Employee } from 'types/Employee';
import { EmployeeListingPage as ClientPage } from 'components/Pages/EmployeeListingPage';

interface Props {
  employees: Employee[];
}

export const dynamic = 'force-dynamic';

const getServerSideProps = async (): Promise<{ props: Props }> => {
  const { orgId } = auth();
  if (orgId === null || orgId === undefined) {
    return { props: { employees: [] } };
  }
  const employees = await getOrganizationEmployees(orgId);

  return {
    props: { employees },
  };
};

const Page = async (): Promise<JSX.Element> => {
  const {
    props: { employees },
  } = await getServerSideProps();

  return <ClientPage employees={employees} />;
};

export default Page;
