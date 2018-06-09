import React, { Component } from 'react';

import PollOption from '../PollOption/PollOption';
import Switcher from '../../components/UI/Switcher/Switcher';
import Button from '../../components/UI/Button/Button';
import TextArea from '../../components/UI/TextArea/TextArea';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    submittable: false,
    loading: false
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
    this.setState({loading: true});
    e.preventDefault();

    const localId = localStorage.getItem('localId');
    const userName = localStorage.getItem('userName');

    // remove '' and dedupe
    const optionSet = new Set();
    const options = this.state.options.filter(opt => opt.value !== '');
    options.forEach(opt => { optionSet.add(opt.value); });
    const pollOptions = Array.from(optionSet);

    const poll = {
      title: this.state.title,
      options: pollOptions,
      localId: localId,
      userName: userName
    };

    const token = localStorage.getItem('token');
    axios.post(
      '/polls.json?auth=' + token, poll
    ).then((res) => {
      this.setState({loading: false});

      if (res && res.status === 200) {
        const location = {
          pathname: '/polls/' + res.data.name,
          state: { title: navigationTitles.VOTE }
        };
        this.props.history.push(location);
      }
    }).catch((err) => {
      this.setState({loading: false});
    });
  };

  switchTypeHandler = (type) => {
    const options = [
      { value: '', id: this.randomId() },
      { value: '', id: this.randomId() }
    ];

    this.setState({type: type, options: options});
  };

  randomId = () => {
    return Math.floor(Math.random() * 1000000);
  }

  getPlaceholder = (index) => {
    return index + ((this.state.type === 'text') ? '. Enter an option' : '. Enter a date');
  }

  componentDidUpdate(prevProps, prevState) {
    const submittable = (this.state.title) && this.state.options.filter(e => e.value !== '').length >= 2;
    if (prevState.submittable !== submittable) {
      this.setState({submittable: submittable});
    }
  }

  render() {
    const optionsToRender = this.state.options.map((opt, idx) => {
      return(
        <PollOption
          number={idx + 1}
          key={opt.id}
          pollType={this.state.type}
          placeholder={this.getPlaceholder(idx + 1)}
          onOptionValueChange={(value) => this.optionChangedHandler(opt.id, value)}
        />
      );
    });

    let spinner = null;
    if (this.state.loading) {
      spinner = <Spinner />;
    }

    return(
      <div className={styles.Content}>
        {spinner}
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
