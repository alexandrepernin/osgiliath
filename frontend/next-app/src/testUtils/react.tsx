import {
  RenderResult,
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { flattenMessages } from 'services/i18n';
import { frFRMessages } from 'translations';

interface RenderOptions extends RtlRenderOptions {
  messages?: Record<string, string>;
}

const defaultMessages = flattenMessages(frFRMessages);

/**
 * Render the component passed and wrap it with its providers
 */
const render = (
  ui: React.ReactElement,
  { messages = defaultMessages, ...renderOptions }: RenderOptions = {},
): RenderResult => {
  const Wrapper: React.ComponentType<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <IntlProvider messages={messages} locale="fr" timeZone="Europe/Paris">
      {children}
    </IntlProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
