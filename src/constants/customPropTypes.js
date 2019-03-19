import PropTypes from 'prop-types';

export const MarkerPropType = PropTypes.shape({
  key: PropTypes.number,
  label: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  local: PropTypes.bool,
  pristine: PropTypes.bool,
  deleted: PropTypes.bool,
});

export const MarkersPropType = PropTypes.objectOf(MarkerPropType);

export const CoordinatesPropType = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
})
