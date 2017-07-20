import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import '../../theme.css';

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
          <Header/>
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
}

export default connect(mapStateToProps)(App) ;