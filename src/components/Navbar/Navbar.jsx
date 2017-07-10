import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css'

const propTypes = {

};

const defaultProps = {

};

class Navbar  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "Navbar"> 
        Navbar 
      </div>
    )
  }

}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar ;