import React, { Component } from 'react';

import Switcher from '../../components/UI/Switcher/Switcher';
import PollOption from '../../components/PollOption/PollOption';
import Button from '../../components/UI/Button/Button';
import TextArea from '../../components/UI/TextArea/TextArea';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-polls';

import styles from './PollBuilder.css';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
    settings: [],
    submittable: false
  };

  // submittable
  updateSubmittable() {
    const submittable = (this.state.title !== '') &&
      this.state.options.filter(e => e.value !== '').length >= 2;

    this.setState({submittable: submittable});
  };

  titleChangedHandler = (e) => {
    this.setState({ title: e.target.value }, this.updateSubmittable);
  };

  optionChangedHandler = (id, e) => {
    const opts = this.state.options.map((opt) => {
      if (id === opt.id) {
        return { value: e.target.value, id: id };
      } else {
        return opt;
      }
    });

    const needAnotherPollOption = opts.every((e) => {
      return e.value !== '';
    });

    if (needAnotherPollOption) {
      opts.push( { value: '', id: opts.length });
    }

    this.setState({ options: opts }, this.updateSubmittable);
  };

  createPollHandler = (e) => {
    e.preventDefault();

    const opts = this.state.options.filter((opt) => {
      return opt.value !== '';
    });

    // set all total to zero
    opts.forEach((opt) => {
      opt['total'] = 0;
    });

    const poll = {
      ...this.state,
      options: opts
    };

    axios.post(
      '/polls.json', poll
    ).then((response) => {
      if (response) {
        this.props.history.push('/poll/' + response.data.name);
      }
    }).catch(
      error => console.log(error)
    );
  };

  render() {
    const optionsToRender = this.state.options.map((opt, idx) => {
      return(
        <PollOption number={idx + 1}
          value={this.state.options[idx].value}
          changed={(e) => this.optionChangedHandler(opt.id, e)}
          key={opt.id}
        />
      );
    });

    return(
      <div className={styles.PollBuilder}>
        <DayPicker />
        <Switcher />
        <form onSubmit={this.createPollHandler}>
          <TextArea placeholder='Enter a poll question' changed={this.titleChangedHandler} />
          {optionsToRender}
          <Button label='DONE' disabled={!this.state.submittable} />
        </form>
      </div>
    );
  }
}

export default withErrorHandler(PollBuilder, axios);
