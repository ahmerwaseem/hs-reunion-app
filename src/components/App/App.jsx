import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'

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
      <div className = "App"> 
        App 
      </div>
    )
  }

}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App ;