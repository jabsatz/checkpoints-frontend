import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';

const mockGeolocation = {
  getCurrentPosition: (callback) => {
    setTimeout(callback, 100);
  }
};
  
global.navigator.geolocation = mockGeolocation;

configure({ adapter: new Adapter() });