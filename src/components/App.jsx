import React from 'react';
import styled from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import Main from 'components/Main';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 5vh 5vw;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Main />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
