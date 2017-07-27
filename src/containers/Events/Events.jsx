import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Events.css';

const propTypes = {

};

const defaultProps = {

};

class Events  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "Events"> 
        Events 
      </div>
    )
  }

}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps)(Events) ;