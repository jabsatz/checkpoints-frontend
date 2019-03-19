// test-utils.js
import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }