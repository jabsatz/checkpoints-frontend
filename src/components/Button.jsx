import styled from 'styled-components/macro';

export const Button = styled.button`
  background: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  min-width: 70px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.white};
  box-shadow: 0 3px blur;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.secondaryLight};
  }

  &:disabled,
  &:disabled:hover {
    background-color: ${({ theme }) => theme.secondaryDisabled};
    box-shadow: none;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > ${Button} {
    margin-left: 5px;
  }
`;
