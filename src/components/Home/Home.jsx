import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css'

const propTypes = {

};

const defaultProps = {

};

class Home  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "Home"> 
        Home Placeholders
      </div>
    )
  }

}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home ;