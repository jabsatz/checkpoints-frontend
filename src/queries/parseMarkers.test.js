import { parseForClient, parseForServer } from './parseMarkers';
import * as R from 'ramda';

const clientMarkers = {
  12: {
    key: 12,
    lat: -34.571284914,
    lng: -58.381491348,
    local: false,
    label: 'Home',
    pristine: true,
    deleted: false,
  },
  15: {
    key: 15,
    label: 'Somewhere Else',
    lat: -24.185498422,
    lng: 12.531893589,
    local: false,
    pristine: true,
    deleted: false,
  },
};

const serverMarkers = [
  {
    key: 12,
    latitude: -34.571284914,
    longitude: -58.381491348,
    local: false,
    label: 'Home',
  },
  {
    key: 15,
    latitude: -24.185498422,
    longitude: 12.531893589,
    local: false,
    label: 'Somewhere Else',
  },
];

it('parses client markers for server', () => {
  expect(parseForServer(clientMarkers)).toEqual(serverMarkers);
});
it('parses server markers for client', () => {
  expect(parseForClient(serverMarkers)).toEqual(clientMarkers);
});
it('should filter deleted markers when parsing for server', () => {
  const deletedMarkers = R.assocPath([15, 'deleted'], true, clientMarkers);
  const deletedMarkersForServer = parseForServer(deletedMarkers);
  expect(deletedMarkersForServer).toHaveLength(1);
  expect(deletedMarkersForServer[0]).toEqual(serverMarkers[0]);
});
test('markers should survive a round trip', () => {
  expect(parseForClient(parseForServer(clientMarkers))).toEqual(clientMarkers);
});
test('local markers should become non-local when coming back', () => {
  const localMarkers = R.map(R.assoc('local', true), clientMarkers);
  expect(parseForClient(parseForServer(localMarkers))).toEqual(clientMarkers);
});
