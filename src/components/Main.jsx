import React from 'react';
import GoogleMap from 'components/GoogleMap';
import styled from 'styled-components/macro';
import MarkersList from 'components/MarkersList';
import useMarkers from 'hooks/useMarkers';

const Wrapper = styled.main`
  flex-grow: 1;
  display: flex;
`;

const StyledMap = styled(GoogleMap)`
  width: 50%;
  height: 100%;
  &>* {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

const Main = () => {
  const {
    markers,
    handleSetMarker,
    handleMarkerFieldChange,
    handleSave,
    handleDiscard,
    panned,
    handlePan,
  } = useMarkers();

  return (
    <Wrapper>
      <StyledMap
        onSetMarker={handleSetMarker}
        onMarkerFieldChange={handleMarkerFieldChange}
        onMoveMarker={handleSetMarker}
        panned={panned}
        markers={markers}
      />
      <MarkersList
        markers={markers}
        onMarkerFieldChange={handleMarkerFieldChange}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onPan={handlePan}
      />
    </Wrapper>
  );
};

export default Main;
