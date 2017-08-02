import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css'
import ImageOne from '../../slideshowImage1.png';
import ImageTwo from '../../slideshowImage2.jpg';
import { Link } from 'react-router-dom';

const propTypes = {

};

const defaultProps = {

};

class Home  extends Component{
  constructor(props) {
    super(props);
     window.scrollTo(0, 0);
  }
  render(){
    return (
    <div className = "Home"> 
      <Link to="/events">
          <img src={ImageOne} alt="WVHS Building" className="wvhsBuilding col-12"/>
      </Link>
    </div>
    )
  }

}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home ;