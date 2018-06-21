import React from 'react';

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import ParticipantCount from './ParticipantCount';

configure({ adapter: new Adapter() });

describe('<ParticipantCount />', () => {
  it('should show given participant count', () => {
    const wrapper = shallow(<ParticipantCount />);
    wrapper.setProps({ count: 20 });

    expect(wrapper.text()).toContain('20 participants');
  });
});
