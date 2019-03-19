import { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';
import saveMarkers from 'queries/saveMarkers';
import fetchMarkers from 'queries/fetchMarkers';

const useMarkers = () => {
  const [markers, setMarkers] = useState({});

  useEffect(() => {
    fetchMarkers().then(markers => {
      setMarkers(markers);
    });
  }, []);

  const handleSetMarker = newMarker => {
    setMarkers(R.assoc(newMarker.key, R.assoc('pristine', R.not(R.prop(newMarker.key)), newMarker)));
  };
  const handleMarkerFieldChange = (key, field, value) => {
    setMarkers(R.assocPath([key, field], value));
    setMarkers(R.assocPath([key, 'pristine'], false));
  }

  const [loading, setloading] = useState(false);
  const handleSave = useCallback(async () => {
    if (!loading) {
      setloading(true);
      const savedMarkers = await saveMarkers(markers);
      setMarkers(savedMarkers);
      setloading(false);
    }
  }, [loading, markers]);
  const handleDiscard = useCallback(async () => {
    if (!loading) {
      setloading(true);
      const loadedMarkers = await fetchMarkers();
      setMarkers(loadedMarkers);
      setloading(false);
    }
  }, [loading]);

  const [panned, handlePan] = useState(null);

  return {
    markers,
    handleSetMarker,
    handleMarkerFieldChange,
    loading,
    handleSave,
    handleDiscard,
    panned,
    handlePan,
  };
};

export default useMarkers;