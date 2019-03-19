import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-right: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ErrorText = styled.span`
  text-align: center;
  width: 50%;
`;

export default class ErrorBoundary extends PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.className}>
          <Wrapper>
            <ErrorText>
              Something went wrong. It's most likely that the API Key's limit has been reached. The Google API should be
              available again within the minute.
              <br />
              <br />
              (tl;dr just wait a bit and refresh).
            </ErrorText>
          </Wrapper>
        </div>
      );
    }

    return this.props.children;
  }
}
