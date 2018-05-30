import React, { Component } from 'react';

import PollOption from '../PollOption/PollOption';
import Switcher from '../../components/UI/Switcher/Switcher';
import Button from '../../components/UI/Button/Button';
import TextArea from '../../components/UI/TextArea/TextArea';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import Auth from '../Auth/Auth';

import * as navigationTitles from '../../components/Navigation/NavigationTitles';

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

  titleChangedHandler = (e) => {
    this.setState({ title: e.target.value });
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

    this.setState({ options: opts });
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

    const token = localStorage.getItem('token');
    axios.post(
      '/polls.json?auth=' + token, poll
    ).then((res) => {
      if (res && res.status === 200) {
        const location = {
          pathname: '/polls/' + res.data.name,
          state: { title: navigationTitles.VOTE }
        };
        this.props.history.push(location);
      }
    }).catch((err) => {
      console.log('err: ', err);
    });
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

  componentDidUpdate(prevProps, prevState) {
    const submittable = (this.state.title) && this.state.options.filter(e => e.value !== '').length >= 2;
    if (prevState.submittable !== submittable) {
      this.setState({submittable: submittable});
    }
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
        <Modal show={false}>
          <Auth />
        </Modal>
      </div>
    );
  }
}

export default withErrorHandler(PollBuilder, axios);
