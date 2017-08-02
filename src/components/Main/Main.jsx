import  React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import LoginPage from '../../containers/LoginPage/LoginPage';
import Register from '../../containers/Register/Register';
import Events from '../../containers/Events/Events';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';
import './Main.css';


const propTypes = {

};

const defaultProps = {

};

class Main  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "Main container-fluid"> 
        <Switch>
          <Route exact path="/"   component={Home}/>
          <Route path="/contact"  component={Contact}/>
          <Route path="/login"    component={LoginPage}/>
          <Route path="/events"   component={Events}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
    )
  }

}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main ;