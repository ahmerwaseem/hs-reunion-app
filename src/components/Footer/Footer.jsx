import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.css'
import  SocialIcons  from 'react-social-icons';

const propTypes = {

};

const defaultProps = {

};

class Footer  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
      const urls = [
    'http://twitter.com/',
    'http://facebook.com/in/',
    'http://www.linkedin.com/'
    ];
    return (
      <div className = "Footer"> 
        <div className = "Footer-Content text-center font-weight-bold">
          WVHS - REUNION - 2017 &copy;<SocialIcons urls={urls} />
        </div>

      </div>
    )
  }

}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer ;