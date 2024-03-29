import  React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import LoginPage from '../../containers/LoginPage/LoginPage';
import './Header.css';
import logo from '../../wvcolorlogo.jpg';
import { bindActionCreators } from 'redux'
import { signOut } from '../../actions/users';
import { connect } from 'react-redux';
import chiefLogo from '../../chieflogo.png';
import brand from '../../BrandImage.png';
import  SocialIcons  from 'react-social-icons';
import ModalWindow from '../ModalWindow/ModalWindow'
const propTypes = {

};

const defaultProps = {

};

class Header  extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }

  }
  render(){
    const urls = [
    'http://twitter.com/',
    'http://facebook.com/in/',
    'http://www.linkedin.com/'
    ];
    return (
      <div className="Header">
          <nav className="navbar navbar-toggleable-md sticky-top navbar-light">
            <a className="navbar-brand" href="#">
              <img src={brand} width="650px" height="325px" className="d-inline-block align-top text img-fluid" alt=""/>
            </a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="Header-Nav navbar-nav">
                <li className="Header-Item nav-item" >
                  <Link to='/'>HOME</Link>
                </li>
                <li className="Header-Item nav-item" >
                  <Link to='/events'>EVENTS</Link>
                </li>
                <li className="Header-Item nav-item" >
                  <Link to='/classmates'>CLASSMATES</Link>
                </li>
                <li className="Header-Item nav-item" >
                  <Link to='/contact'>CONTACT</Link>
                </li>
                {(() =>{
                  if (!this.props.user.signedIn){
                    return (
                      <ul className="Header-Nav navbar-nav">
                        <li className="Header-Item nav-item" >
                          <Link to='/login'>LOGIN</Link>
                        </li>
                        <li className="Header-Item nav-item" >
                          <Link to='/register'>REGISTER</Link>
                        </li>
                      </ul>
                    )
                  }
                  else{
                    return (
                      <ul className="Header-Nav navbar-nav">
                        <li className="Header-Item nav-item" >
                          <span className="name">HI, {this.props.user.userInfo.userFirstName.toUpperCase()} </span>
                        </li>
                        <li className="Header-Item nav-item" onClick={ () => { this.props.signOut(); this.setState({ showModal: true})}}>
                          <span>SIGN OUT</span>
                        </li>
                      </ul>
                    )
                  }
                })()}
              </ul>
            <ModalWindow 
            animation= {true}
            showModal= {this.state.showModal} 
            title = "Thanks for stopping by!"
            content = "You have been logged out."
            cancel = "Close"
            onCancel = {(e)=>{this.setState({showModal:false})}}
            />
            </div>
              
              {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form> */}
          <SocialIcons urls={urls} />
          </nav>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signOut : signOut}, dispatch);
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header)