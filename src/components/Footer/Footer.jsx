import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.css'

const propTypes = {

};

const defaultProps = {

};

class Footer  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "Footer"> 
        <div className = "Footer-Content">
        Waubonsie Valley Warrior - Class of 2006 Reunion &copy;
        </div>
      </div>
    )
  }

}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer ;