import React, { Component } from 'react';

import Switcher from '../components/UI/Switcher/Switcher';
import Option from '../components/Option';
import Button from '../components/UI/Button/Button';
import TextArea from '../components/UI/TextArea/TextArea';

import axios from '../axios-polls';

import styles from './PollBuilder.css';

// type is either 'text' or 'date'
// settings can contain 'deadline', 'multivote'

class PollBuilder extends Component {

  state = {
    title: null,
    options: [
      { value: '', id: 0 },
      { value: '', id: 1 }
    ],
    type: 'text',
    settings: []
  };

  titleChangedHandler = (e) => {
    this.setState({ title: e.target.value });
  };

  optionChangedHandler = (id, e) => {
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

  createPollHandler = (e) => {
    e.preventDefault();

    const opts = this.state.options.filter((opt) => {
      return opt.value !== '';
    });

    const poll = {
      ...this.state,
      options: opts
    };

    axios.post(
      '/polls.json', poll
    ).then((response) => {
      console.log(response);

      this.props.history.push('/poll/' + response.data.name);
    }).catch(
      error => console.log(error)
    );
  };

  render() {
    const optionsToRender = this.state.options.map((opt, idx) => {
      return(
        <Option number={idx + 1}
          value={this.state.options[idx].value}
          changed={(e) => this.optionChangedHandler(opt.id, e)}
          key={opt.id}
        />
      );
    });

    return(
      <div className={styles.PollBuilder}>
        <Switcher />
        <form onSubmit={this.createPollHandler}>
          <TextArea placeholder='Enter a poll question' changed={this.titleChangedHandler} />
          {optionsToRender}
          <Button label='DONE' />
        </form>
      </div>
    );
  }
}

export default PollBuilder;
