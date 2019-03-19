import React from 'react';
import PropTypes from 'prop-types';
import { MarkersPropType, CoordinatesPropType } from 'constants/customPropTypes';
import GoogleMapContent from 'components/GoogleMapContent';
import MAPS_API_KEY from 'constants/mapsApiKey';
import useLocalCoords from 'hooks/useLocalCoords';
import ErrorBoundary from './ErrorBoundary';

const GoogleMap = ({ className, ...otherProps }) => {
  const coords = useLocalCoords();

  return (
    <ErrorBoundary className={className}>
      <GoogleMapContent
        {...otherProps}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className={className} />}
        mapElement={<div style={{ height: `100%` }} />}
        coords={coords}
      />
    </ErrorBoundary>
  );
};

GoogleMap.propTypes = {
  className: PropTypes.string,
  defaultZoom: PropTypes.number,
  markers: MarkersPropType,
  panned: CoordinatesPropType,
  onSetMarker: PropTypes.func,
  onMarkerFieldChange: PropTypes.func,
};

export default GoogleMap;
