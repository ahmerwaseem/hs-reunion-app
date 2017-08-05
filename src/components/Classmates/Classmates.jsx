import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Classmates.css'
import { getAllUsers } from '../../actions/users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const propTypes = {

};

const defaultProps = {

};

class Classmates  extends Component{
  constructor(props) {
    super(props);
    this.props.getAllUsers();
  }
  render(){
    return (
      <div className = "Classmates"> 
        <h5 className="row"><span className="col-md-7 offset-md-2 col-xs-12">Classmates</span></h5>
            {(()=>{
              if (this.props.user != undefined && this.props.user.classmates != undefined){
                const {
                  classmates
                }
                = this.props.user;;
                console.log(classmates, "classmates");
                return (

                  <div>
                    {(()=>{
                      return classmates.map((item)=>{
                        return(
                          <div className="row item">
                          <div  className="list-group-item list-group-item-action flex-column align-items-start col-md-7 offset-md-2 col-xs-12">
                            <div className="d-flex w-300 justify-content-between">
                              <div className="mb-1 name"><strong>{`${item.firstname} ${item.lastname}`}</strong></div>
                            </div>
                            <small className="text-muted">{`Occupation: ${item.occupation}`}</small>
                            <p className="mb-1">{`${item.firstname}: ${item.bio}`}</p>
                            
                          </div>
                          </div>


                        )

                      })

                    })()}
                  </div>
                )
              }
              else{
                return(
                  <span>Apparently no one has signed up.</span>

                )
              }




            })()}
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
  return bindActionCreators({ getAllUsers : getAllUsers}, dispatch);
}

Classmates.propTypes = propTypes;
Classmates.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Classmates)



