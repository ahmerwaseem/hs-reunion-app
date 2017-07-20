import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LoginPage.css';

const propTypes = {

};

const defaultProps = {

};

class LoginPage  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "LoginPage"> 
        LoginPage 
      </div>
    )
  }

}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state;
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps)(LoginPage) ;