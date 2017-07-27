import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Contact.css'

const propTypes = {

};

const defaultProps = {

};

class Contact  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "Contact"> 
        Contact
      </div>
    )
  }

}

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact ;