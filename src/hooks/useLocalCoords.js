import { useState, useEffect } from 'react';

const useLocalCoords = () => {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    const saveCoords = ({ coords: { longitude, latitude } }) => {
      setCoords({
        lng: longitude,
        lat: latitude,
      });
    };

    navigator.geolocation.getCurrentPosition(saveCoords, () => {
      saveCoords({ coords: { longitude: 0, latitude: 0 } });
    });
  }, []);
  return coords;
};

export default useLocalCoords;
