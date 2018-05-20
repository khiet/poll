import React, { Component } from 'react';

import PollOption from '../PollOption/PollOption';
import Switcher from '../../components/UI/Switcher/Switcher';
import Button from '../../components/UI/Button/Button';
import TextArea from '../../components/UI/TextArea/TextArea';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-polls';

import styles from './PollBuilder.css';

// settings can contain 'deadline', 'multivote'
// id is a random ID so that options reset on type change
class PollBuilder extends Component {

  state = {
    title: '',
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
    const submittable = (this.state.title) &&
      this.state.options.filter(e => e.value !== '').length >= 2;

    this.setState({submittable: submittable});
  };

  titleChangedHandler = (e) => {
    this.setState({ title: e.target.value }, this.updateSubmittable);
  };

  optionChangedHandler = (id, value) => {
    const opts = this.state.options.map((opt) => {
      if (id === opt.id) {
        return { value: value, id: id };
      } else {
        return opt;
      }
    });

    const needAnotherPollOption = opts.every((opt) => {
      return opt.value !== '';
    });

    if (needAnotherPollOption) {
      opts.push({ value: '', id: this.randomId() });
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

  switchTypeHandler = (type) => {
    const opts = [
      { value: '', id: this.randomId() },
      { value: '', id: this.randomId() }
    ];

    this.setState({type: type, options: opts});
  };

  randomId = () => {
    return Math.floor(Math.random() * 1000000);
  }

  componenttDidMount() {
    console.log('componenttDidMount');
  }

  render() {
    const optionsToRender = this.state.options.map((opt, idx) => {

      let placeholder = '';
      if (this.state.type === 'text') {
        placeholder = (idx + 1) + '. Enter an option';
      } else if (this.state.type === 'date') {
        placeholder = (idx + 1) + '. Enter a date';
      }

      return(
        <PollOption
          number={idx + 1}
          key={opt.id}
          pollType={this.state.type}
          placeholder={placeholder}
          onOptionValueChange={(value) => this.optionChangedHandler(opt.id, value)}
        />
      );
    });

    return(
      <div className={styles.PollBuilder}>
        <Switcher clicked={this.switchTypeHandler} selectedType={this.state.type} />
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
