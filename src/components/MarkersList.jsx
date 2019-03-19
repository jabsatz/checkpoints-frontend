import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components/macro';
import MarkerCard from 'components/MarkerCard';
import { Button, ButtonsWrapper } from 'components/Button';
import PropTypes from 'prop-types';
import { MarkersPropType } from 'constants/customPropTypes';

const Wrapper = styled.div`
  width: 50%;
  background: ${({ theme }) => theme.lightBackground};
  max-height: 100%;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const Title = styled.h1`
  margin: 10px 0 20px;
`;

const ListHeader = styled.div`
  display: flex;
  flex-flow: column;
  height: 115px;
  padding: 10px;
  box-sizing: border-box;
`;

const List = styled.div`
  height: calc(100% - 115px);
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const MarkersList = ({ markers, onSave, onDiscard, onPan, onMarkerFieldChange }) => {
  const noneChanged = R.all(R.prop('pristine'), R.values(markers));

  return (
    <Wrapper>
      <ListHeader>
        <Title>Begin by clicking the map!</Title>
        <ButtonsWrapper>
          <Button disabled={noneChanged} onClick={onSave}>
            save
          </Button>
          <Button disabled={noneChanged} onClick={onDiscard}>
            discard your changes
          </Button>
        </ButtonsWrapper>
      </ListHeader>
      <List>
        {R.values(markers).map(marker => (
          <MarkerCard key={marker.key} marker={marker} onMarkerFieldChange={onMarkerFieldChange} onPan={onPan} />
        ))}
      </List>
    </Wrapper>
  );
};

MarkersList.propTypes = {
  markers: MarkersPropType,
  onSave: PropTypes.func,
  onDiscard: PropTypes.func,
  onPan: PropTypes.func,
  onMarkerFieldChange: PropTypes.func,
};

export default MarkersList;
