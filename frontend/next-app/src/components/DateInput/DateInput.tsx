import { DatePickerInput as MantineDatePickerInput } from '@mantine/dates';
import { FiCalendar } from 'react-icons/fi';
import { MantineProvider } from '@mantine/core';

interface Props {
  value: Date | null;
  setValue: (value: Date | null) => void;
}

export const DateInput = ({ value, setValue }: Props): JSX.Element => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'light',
    }}
  >
    <MantineDatePickerInput
      value={value}
      onChange={setValue}
      miw="50%"
      allowDeselect={true}
      rightSection={<FiCalendar />}
      size="sm"
      styles={{ input: { minHeight: '2.50rem' } }}
    />
  </MantineProvider>
);
