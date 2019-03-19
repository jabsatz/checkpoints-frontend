import * as R from 'ramda';

export const parseForClient = markers =>
  markers.reduce(
    (markersObject, { key, label, longitude, latitude }) =>
      R.assoc(
        key,
        {
          key,
          label,
          lng: parseFloat(longitude),
          lat: parseFloat(latitude),
          local: false,
          pristine: true,
          deleted: false,
        },
        markersObject
      ),
    {}
  );

export const parseForServer = markers =>
  R.values(markers).filter(({deleted}) => !deleted).map(({ key, label, lng, lat, local }) => {
    const formattedMarker = { key, label, longitude: parseFloat(lng), latitude: parseFloat(lat), local };
    return formattedMarker;
  });
