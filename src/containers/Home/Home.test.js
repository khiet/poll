import React from 'react';

import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';

import Home from './Home';

import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';

import '../../test/support/LocalStorageMock';

configure({ adapter: new Adaptor() });

describe('<Home />', () => {
  it('should have a button to authenticate', () => {
    const wrapper = shallow(<Home />);

    expect(
      wrapper.find(Button).prop('label')
    ).toEqual('LOGIN TO CREATE POLL');
  });

  it('should have a link to create a poll if authenticated', () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ authenticated: true });

    expect(
      wrapper.find(Link).prop('to').pathname
    ).toEqual("/polls");
  });
});
