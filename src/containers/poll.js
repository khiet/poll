import React, { Component } from 'react';

import Option from '../components/Option';
import Button from '../ui/Button';

// type is either 'text' or 'date'
// settings can contain 'deadline', 'multivote'

class Poll extends Component {

  state = {
    title: null,
    options: [
      { value: '', id: 0 },
      { value: '', id: 1 }
    ],
    type: 'text',
    settings: []
  };

  titleChanged = (e) => {
    this.setState({ title: e.target.value });
  };

  optionChanged = (e, id) => {
    const opts = this.state.options.map((opt) => {
      if (id === opt.id) {
        return { value: e.target.value, id: id };
      } else {
        return opt;
      }
    });

    const needAnotherOption = opts.every((e) => {
      return e.value !== '';
    });

    if (needAnotherOption) {
      opts.push( { value: '', id: opts.length });
    }

    this.setState({ options: opts });
  };

  createPoll = (e) => {
    e.preventDefault();

    console.log(this.state);
  };

  render() {
    const optionsToRender = this.state.options.map((opt, idx) => {
      return(
        <Option number={idx + 1}
          value={this.state.options[idx].value}
          changed={(e) => this.optionChanged(e, opt.id)}
          key={opt.id}
        />
      );
    });

    return(
      <div>
        <form onSubmit={this.createPoll}>
          <textarea onChange={this.titleChanged} placeholder='Enter a poll question'/>
          {optionsToRender}
          <Button label='DONE'/ >
        </form>
      </div>
    );
  }
}

export default Poll;
