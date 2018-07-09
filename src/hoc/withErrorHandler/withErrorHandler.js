import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auth from '../../containers/Auth/Auth';

import styles from './withErrorHandler.css';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      errorStatus: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({error: null, errorStatus: null});
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use((res) => res, err => {
        const responseStatus = err.response ? err.response.status : null;
        this.setState({error: err, errorStatus: responseStatus});

        // err.response can be undefined e.g. Network Error
        return err.response;
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      let modalContent = this.state.error ? this.state.error.message : null;
      if (this.state.errorStatus === 401) {
        modalContent = (
          <React.Fragment>
            <div className={styles.Heading}>
              Please sign up or log in to continue
            </div>
            <Auth authSuccess={this.errorConfirmedHandler}/>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <Modal
            backdropClicked={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {modalContent}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default withErrorHandler;
