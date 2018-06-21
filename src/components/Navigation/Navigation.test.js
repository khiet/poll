import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from './Navigation';

configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  it('should render given title', () => {
    const wrapper = shallow(<Navigation />);
    wrapper.setProps({ title: 'FooBar' });

    expect(wrapper.text()).toContain('FooBar');
  });
});
