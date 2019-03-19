import { parseForClient } from 'queries/parseMarkers';

const fetchMarkers = async () => {
  const response = await fetch('http://localhost:8080/markers', {
    method: 'get',
  });
  const { markers } = await response.json();
  return parseForClient(markers);
};

export default fetchMarkers;