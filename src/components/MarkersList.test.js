import React from 'react';
import MarkersList from './MarkersList';
import MarkerCard from './MarkerCard';
import * as R from 'ramda';
import { shallow } from 'enzyme';
import { render, fireEvent } from 'utils/testUtils';

const pristineMarkers = {
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

const modifiedMarkers = R.assocPath([12, 'pristine'], false, pristineMarkers);

it('renders two MarkerCards', () => {
  const shallowList = shallow(<MarkersList markers={pristineMarkers} />);
  console.log(shallowList.find(MarkerCard));
  expect(shallowList.find(MarkerCard)).toHaveLength(2);
});

it('renders disabled actions when markers are pristine', () => {
  const { getByText } = render(<MarkersList markers={pristineMarkers} />);
  const saveButton = getByText(/save/i);
  const discardButton = getByText(/discard/i)
  expect(saveButton.disabled).toBe(true);
  expect(discardButton.disabled).toBe(true);
})

it('triggers save onSave', () => {
  const saveFn = jest.fn();
  const { getByText } = render(<MarkersList markers={modifiedMarkers} onSave={saveFn} />);
  fireEvent.click(getByText(/save/i));
  expect(saveFn).toHaveBeenCalledTimes(1);
});

it('triggers discard onDiscard', () => {
  const discardFn = jest.fn();
  const { getByText } = render(<MarkersList markers={modifiedMarkers} onDiscard={discardFn} />);
  fireEvent.click(getByText(/discard/i));
  expect(discardFn).toHaveBeenCalledTimes(1);
})
