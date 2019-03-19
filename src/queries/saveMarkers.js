import { parseForServer, parseForClient } from "queries/parseMarkers";

const saveMarkers = async markers => {
  const response = await fetch('http://localhost:8080/markers', {
    method: 'post',
    body: JSON.stringify({
      markers: parseForServer(markers),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { markers: savedMarkers } = await response.json();
  return parseForClient(savedMarkers);
};

export default saveMarkers;
