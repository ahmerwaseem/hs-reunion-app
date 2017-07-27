import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './Register.css';

const propTypes = {

};

const defaultProps = {

};


class Register  extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className = "Register"> 
        Register 
      </div>
    )
  }

}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps)(Register) ;