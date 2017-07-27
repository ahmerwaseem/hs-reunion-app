import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

const propTypes = {

};

const defaultProps = {

};

class App  extends Component{
  constructor(props) {
    super(props);

  }
  render(){
    return (
      <div className="App">
        <div>
          <Header {...this.props}/>
          <Main/>
          <Footer/>
        </div>
      </div>
    )
  }

}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App)) ;