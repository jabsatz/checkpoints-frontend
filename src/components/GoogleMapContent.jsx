import React, { useEffect, useRef } from 'react';
import * as R from 'ramda';
import { GoogleMap as ReactGoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import PropTypes from 'prop-types';
import { MarkersPropType, CoordinatesPropType } from 'constants/customPropTypes';

const latLngFromData = data => ({ lat: data.latLng.lat(), lng: data.latLng.lng() });

const GoogleMapContent = withScriptjs(
  withGoogleMap(function Content({
    defaultZoom = 14,
    coords,
    markers,
    panned,
    onSetMarker,
    onMarkerFieldChange,
    ...props
  }) {
    const GoogleMapRef = useRef();
    useEffect(() => {
      if(GoogleMapRef.current) {
        GoogleMapRef.current.panTo(panned);
      }
    }, [panned])
    const handleAddMarker = ({ lat, lng }) => {
      const lastKey = parseInt(R.last(R.keys(markers)), 10);
      const newMarker = {
        key: Number.isInteger(lastKey) ? lastKey + 1 : 0,
        lat,
        lng,
        label: '',
        local: true,
        pristine: false,
        deleted: false,
      };
      onSetMarker(newMarker);
    };
    const handleMoveMarker = markerToMove => ({ lat, lng }) => {
      const movedMarker = R.evolve(
        {
          lat: () => lat,
          lng: () => lng,
          pristine: () => false,
        },
        markerToMove
      );
      onSetMarker(movedMarker);
    };

    return coords ? (
      <ReactGoogleMap
        {...props}
        onClick={R.pipe(
          latLngFromData,
          handleAddMarker
        )}
        defaultZoom={defaultZoom}
        defaultCenter={coords}
        ref={GoogleMapRef}
      >
        {R.values(markers).map(marker => (
          <MarkerWithLabel
            key={marker.key}
            onClick={() => onMarkerFieldChange(marker.key, 'deleted', !marker.deleted)}
            position={marker}
            draggable
            onDragEnd={R.pipe(
              latLngFromData,
              handleMoveMarker(marker)
            )}
            labelVisible={!!marker.label}
            labelStyle={{
              opacity: marker.deleted ? 0.5 : 1,
              borderRadius: '5px',
              background: '#e27d60',
              padding: '5px',
              fontSize: '16px',
            }}
            // Due to how the react-google-maps library works, the only way to initialize a Google Maps Point
            // is this, we have to trust the 'google' object to exist globally.
            labelAnchor={new google.maps.Point(0, 0)} //eslint-disable-line
            opacity={marker.deleted ? 0.5 : 1}
          >
            <label>{marker.label}</label>
          </MarkerWithLabel>
        ))}
      </ReactGoogleMap>
    ) : null;
  })
);

GoogleMapContent.propTypes = {
  defaultZoom: PropTypes.number,
  coords: CoordinatesPropType,
  markers: MarkersPropType,
  panned: CoordinatesPropType,
  onSetMarker: PropTypes.func,
  onMarkerFieldChange: PropTypes.func,
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
}

export default GoogleMapContent;
