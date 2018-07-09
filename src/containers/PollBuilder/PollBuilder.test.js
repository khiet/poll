import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PollBuilder } from './PollBuilder';
import Button from '../../components/UI/Button/Button';

configure({ adapter: new Adapter() });

const fillInTextField = (element, index) => {
  element.simulate('change', {
    target: { value: 'Answer' + index}
  })
};

describe('<PollBuilder />', () => {
  it('should disable Button by default', () => {
    const wrapper = shallow(<PollBuilder />);

    expect(wrapper.find(Button).prop('disabled')).toEqual(true);
  });

  it ('should create another field when two fields are filled in', () => {
    const wrapper = mount(<PollBuilder />);

    expect(wrapper.find("input[type='text']").length).toEqual(2);
    wrapper.find("input[type='text']").forEach(fillInTextField);
    expect(wrapper.find("input[type='text']").length).toEqual(3);
  });

  it('should enable Button when all fields are filled in', () => {
    const wrapper = mount(<PollBuilder />);

    wrapper.find('textarea').simulate('change', {
      target: { value: 'Question' }
    })

    wrapper.find("input[type='text']").forEach(fillInTextField);

    expect(wrapper.find(Button).prop('disabled')).toEqual(false);
  });
});
