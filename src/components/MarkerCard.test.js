import React from 'react';
import MarkerCard from './MarkerCard';
import * as R from 'ramda';
import { render, fireEvent } from 'utils/testUtils';

const marker = {
  key: 12,
  lat: -34.571284914,
  lng: -58.381491348,
  local: false,
  label: 'Home',
  pristine: true,
  deleted: false,
};
const deletedMarker = R.assoc('deleted', true, marker);

const onMarkerFieldChange = jest.fn();
const onPan = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

it('all card variations should have different styles', () => {
  const card = render(<MarkerCard marker={marker} />).container.firstChild;
  const deletedCard = render(<MarkerCard marker={deletedMarker} />).container.firstChild;
  const editedCard = render(<MarkerCard marker={R.assoc('pristine', false, marker)} />).container.firstChild;
  const editedAndDeletedCard = render(<MarkerCard marker={R.assoc('pristine', false, deletedMarker)} />).container
    .firstChild;

  expect(card.className).not.toBe(deletedCard.className);
  expect(card.className).not.toBe(editedCard.className);
  expect(card.className).not.toBe(editedAndDeletedCard.className);
  expect(deletedCard.className).not.toBe(editedCard.className);
  expect(deletedCard.className).not.toBe(editedAndDeletedCard.className);
  expect(editedCard.className).not.toBe(editedAndDeletedCard.className);
});

describe('input fields tests', () => {
  let testRender;
  beforeEach(() => {
    testRender = render(<MarkerCard marker={marker} onMarkerFieldChange={onMarkerFieldChange} onPan={onPan} />);
  });
  it('renders input and label for title', () => {
    const name = testRender.getByLabelText(/Marker Name/i);
    expect(name.tagName).toBe('INPUT');
  });
  it('triggers change when editing title', () => {
    const name = testRender.getByLabelText(/Marker Name/i);
    fireEvent.change(name, { target: { value: 'Amsterdam' } });
    expect(onMarkerFieldChange).toHaveBeenCalledTimes(1);
    expect(onMarkerFieldChange).toHaveBeenCalledWith(12, 'label', 'Amsterdam');
  });
  it('renders input and label for longitude', () => {
    const longitude = testRender.getByLabelText(/Longitude/i);
    expect(longitude.tagName).toBe('INPUT');
  });
  it('triggers change when editing longitude', () => {
    const longitude = testRender.getByLabelText(/Longitude/i);
    fireEvent.change(longitude, { target: { value: 23.1351356 } });
    expect(onMarkerFieldChange).toHaveBeenCalledTimes(1);
    expect(onMarkerFieldChange).toHaveBeenCalledWith(12, 'lng', 23.1351356);
  });
  it('renders input and label for latitude', () => {
    const latitude = testRender.getByLabelText(/Latitude/i);
    expect(latitude.tagName).toBe('INPUT');
  });
  it('triggers change when editing latitude', () => {
    const latitude = testRender.getByLabelText(/Latitude/i);
    fireEvent.change(latitude, { target: { value: 12.12354668 } });
    expect(onMarkerFieldChange).toHaveBeenCalledTimes(1);
    expect(onMarkerFieldChange).toHaveBeenCalledWith(12, 'lat', 12.12354668);
  });
});

describe('Remove/Restore button tests', () => {
  it('renders remove button', () => {
    const removeButton = render(<MarkerCard marker={marker} />).getByText(/Remove/i);
    expect(removeButton.tagName).toBe('BUTTON');
  });
  it('triggers deletion when clicking remove button', () => {
    const removeButton = render(<MarkerCard marker={marker} onMarkerFieldChange={onMarkerFieldChange} />).getByText(
      /Remove/i
    );
    fireEvent.click(removeButton);
    expect(onMarkerFieldChange).toHaveBeenCalledTimes(1);
    expect(onMarkerFieldChange).toHaveBeenCalledWith(12, 'deleted', true);
  });
  it('renders restore button if marker is deleted', () => {
    const restoreButton = render(<MarkerCard marker={deletedMarker} />).getByText(/Restore/i);
    expect(restoreButton.tagName).toBe('BUTTON');
  });
  it('triggers restoration when clicking restore button', () => {
    const restoreButton = render(
      <MarkerCard marker={deletedMarker} onMarkerFieldChange={onMarkerFieldChange} />
    ).getByText(/Restore/i);
    fireEvent.click(restoreButton);
    expect(onMarkerFieldChange).toHaveBeenCalledTimes(1);
    expect(onMarkerFieldChange).toHaveBeenCalledWith(12, 'deleted', false);
  });
});

describe('Go to button tests', () => {
  it('renders go to button', () => {
    const goToButton = render(<MarkerCard marker={marker} />).getByText(/Go to/i);
    expect(goToButton.tagName).toBe('BUTTON');
  });

  it('triggers onPan when clicking go to button', () => {
    const goToButton = render(<MarkerCard marker={marker} onPan={onPan} />).getByText(/Go to/i);
    fireEvent.click(goToButton);
    expect(onPan).toHaveBeenCalledTimes(1);
    expect(onPan).toHaveBeenCalledWith(marker);
  });
});
