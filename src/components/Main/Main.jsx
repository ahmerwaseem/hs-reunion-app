import  React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
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
      <div className = "Main"> 
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path='/contact' component={Contact}/>
          {/*<Route component={Home}/>*/}
          {/*<Route path='/contact' component={Contact}/>*/}
        </Switch>
      </div>
    )
  }

}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main ;