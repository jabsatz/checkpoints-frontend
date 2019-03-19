import React from 'react';
import styled from 'styled-components/macro';
import MaterialInput from 'components/MaterialInput';
import { Button, ButtonsWrapper } from 'components/Button';
import PropTypes from 'prop-types';
import { MarkerPropType } from 'constants/customPropTypes';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  transition: opacity 300ms ease-in-out;
  opacity: ${({ deleted }) => (deleted ? 0.5 : 1)};
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme, pristine }) => (pristine ? theme.white : theme.secondaryVariant)};
  width: 42%;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  font-size: 18px;
  width: 100%;
  outline: none;
  margin-bottom: 10px;
  &::placeholder {
    color: ${({ theme }) => theme.primary};
  }
`;

const MarkerCard = ({ marker, onMarkerFieldChange, onPan }) => {
  const parseIfFloat = (number, fallback) => {
    const isFloat = !isNaN(parseFloat(number));
    return isFloat ? parseFloat(number) : fallback;
  };
  return (
    <Wrapper pristine={marker.pristine} deleted={marker.deleted}>
      <MaterialInput label="Marker Name">
        <StyledInput
          value={marker.label}
          onChange={event => onMarkerFieldChange(marker.key, 'label', event.target.value)}
        />
      </MaterialInput>
      <MaterialInput label="Latitude">
        <StyledInput
          value={marker.lat}
          onChange={event => onMarkerFieldChange(marker.key, 'lat', parseIfFloat(event.target.value, marker.lat))}
        />
      </MaterialInput>
      <MaterialInput label="Longitude">
        <StyledInput
          value={marker.lng}
          onChange={event => onMarkerFieldChange(marker.key, 'lng', parseIfFloat(event.target.value, marker.lng))}
        />
      </MaterialInput>
      <ButtonsWrapper>
        <Button onClick={() => onPan(marker)}>Go to</Button>
        {marker.deleted ? (
          <Button onClick={() => onMarkerFieldChange(marker.key, 'deleted', false)}>Restore</Button>
        ) : (
          <Button onClick={() => onMarkerFieldChange(marker.key, 'deleted', true)}>Remove</Button>
        )}
      </ButtonsWrapper>
    </Wrapper>
  );
};

MarkerCard.propTypes = {
  marker: MarkerPropType,
  onMarkerFieldChange: PropTypes.func,
  onPan: PropTypes.func,
};

export default MarkerCard;
