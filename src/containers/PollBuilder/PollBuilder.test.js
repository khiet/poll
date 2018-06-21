import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PollBuilder } from './PollBuilder';
import Button from '../../components/UI/Button/Button';

configure({ adapter: new Adapter() });

describe('<PollBuilder />', () => {
  it('should disable Button by default', () => {
    const wrapper = shallow(<PollBuilder />);

    expect(wrapper.find(Button).prop('disabled')).toEqual(true);
  });

  it('should enable Button when all fields are filled in', () => {
    const wrapper = mount(<PollBuilder />);

    wrapper.find('textarea').simulate('change', {
      target: { value: 'hello' }
    })

    wrapper.find("input[type='text']").forEach((e) => {
      e.simulate('change', {
        target: { value: 'hello' }
      })
    });

    expect(wrapper.find(Button).prop('disabled')).toEqual(false);
  });
});
