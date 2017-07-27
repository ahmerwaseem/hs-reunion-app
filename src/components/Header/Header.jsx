import  React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import LoginPage from '../../containers/LoginPage/LoginPage';
import './Header.css';
import logo from '../../wvcolorlogo.jpg';
import 'bootstrap/dist/css/bootstrap.css';


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
        <nav className="navbar navbar-toggleable-md navbar-light">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Waubonsie Valley Reunion</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="Header-Nav">
              <li className="Header-Item" >
                <Link to='/'>Home</Link>
              </li>
              <li className="Header-Item" >
                <Link to='/events'>Events</Link>
              </li>
              <li className="Header-Item" >
                <Link to='/contact'>Contact</Link>
              </li>
              {(() =>{
                if (!this.props.user.signedIn){
                  return (
                    <span>
                      <li className="Header-Item" >
                        <Link to='/login'>Login</Link>
                      </li>
                      <li className="Header-Item" >
                        <Link to='/register'>Register</Link>
                      </li>
                    </span>
                  )
                }
                else{
                  return (
                    <span>
                      <li className="Header-Item" >
                        <span>Hi, Buddy </span>
                      </li>
                       <li className="Header-Item" onClick={ () => {}}>
                        <span>Sign Out</span>
                      </li>
                    </span>
                  )
                }
              })()}
            </ul>
          </div>
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
        </nav>
      </div>
/* 
      <div className="Header">
        <div className="Header-Logo">
          <div className="Header-Logo-Image">
          </div>
          <span className="Header-Logo-Text">
            WAUBONSIE VALLEY CLASS REUNION
          </span>
        </div>
        <ul className="Header-Nav">
          <li className="Header-Item">
            <Link to='/'>
              HOME
            </Link>
          </li>
          <li className="Header-Item">
            <Link to='/contact'>
              EVENTS
            </Link>
          </li>
          <li className="Header-Item">
            <Link to='/contact'>
              CONTACT
            </Link>
          </li>
          <li className="Header-Item">LOG IN</li>
          <li className="Header-Item">REGISTER</li>
        </ul>
      </div> */
    )
  }

}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;