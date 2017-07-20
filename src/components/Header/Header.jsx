import  React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import './Header.css';
//import 'bootstrap/dist/css/bootstrap.css';


const propTypes = {

};

const defaultProps = {

};

class Header  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="Header">
        <div className="Header-Logo">
          My logo
        </div>
        <ul className="Header-Nav">
          <li className="Header-Item">
            <Link to='/'>
              Home
            </Link>
          </li>
          <li className="Header-Item">
            <Link to='/contact'>
              Contact
            </Link>
          </li>
          <li className="Header-Item">LInks</li>
          <li className="Header-Item">Links</li>
        </ul>
      </div>
    )
  }

}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header ;