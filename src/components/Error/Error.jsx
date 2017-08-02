import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Error.css'


const Error = (props) => {

    return (
      <div className = "Error"> 
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <span className="">{props.error} </span>
      </div>
    )

}

export default Error ;