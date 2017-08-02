import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import './Register.css';
import classNames from 'classnames';
import { register } from '../../actions/users';
import { bindActionCreators } from 'redux'
import Error from '../../components/Error/Error';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { Modal } from 'react-bootstrap';

import { required, email, asyncValidate, passwordLength, passwordSpaces } from '../../utils/validators';

const validate = (values) =>{
  const errors = {};
  console.log(values);
  if (values.password != null && values.confirmPassword != null){
    if (values.password !== values.confirmPassword){
      errors.confirmPassword = "Passwords do not match";
    }
  }
  return errors;
}

const renderInputField = (props) => {
  const {
    input,
    label,
    name,
    type,
    meta: { touched, error, warning } 
  } = props;

  const change = (e) => {
    
    input.onChange(e.target.value);
  
  }

  const blur = (e) => {
    e.target.value = e.target.value.trim();
    input.onBlur(e.target.value.trim());
  
  }


  return ( 
    <div className="form-group">

      <div className="row">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <label>{label}</label>
        <input className="form-control" type={type} onInput={change} onBlur={blur}/>
      </div>
      </div>
      {(()=>{ 
        if (touched && error)
          return(
          <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12" role="alert">
                  <Error error={error}/>
               </div>
          </div>
          )
      })()}
    </div>
  )
}

export const renderTextArea = (props) => {
  const {
    input,
    label,
    name,
    type,
    meta: { touched, error, warning } 
  } = props;

  const change = (e) => {
   input.onChange(e.target.value);
  
  }

  const blur = (e) => {
    e.target.value = e.target.value.trim();
    input.onBlur(e.target.value.trim());
  
  }


  return ( 
    <div className="form-group">

      <div className="row">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <label>{label}</label>
        <textarea rows="4" cols="50" className="form-control " type={type} onInput={change} onBlur={blur}/>
      </div>
      </div>
      {(()=>{ 
        if (touched && error)
          return(
          <div className="row">
                <div className=" col-md-6 offset-md-3 col-xs-12" role="alert">
                  <Error error={error}/>
               </div>    
          </div>
          )
      })()}
    </div>
  )
}

class Register  extends Component{
  constructor(props) {
    super(props);

    this.state = {
      showModal : false
    }
    console.log(this.props.history,this.props.history.length)


  }
  
  submit = (values) => {
    this.setState({ showModal : true})
    this.props.register(values);
  }

 componentWillMount(){
   window.scrollTo(0, 0)
    if (this.props.user.signedIn){
      this.props.history.push('/')
    }
  }

 componentDidUpdate(){
    if (this.props.user.signedIn){
      this.props.history.push('/')
    }
  }

  render(){

    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (

      <div className = "Register"> 
        <div className= "RegisterRightPanel">
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="row">
            <div className="LoginEmail col-md-6 offset-md-3 col-xs-12 ">
              <h5> Create your account </h5>
            </div>
          </div>
            <div className="LoginEmail">
              <Field 
                name="email"
                type="text"
                component={renderInputField}
                label="Email"
                validate={[required, email]}
              />
            </div>
          <div className="LoginPassword">
            <Field 
              name="password"
              type="password"
              component={renderInputField}
              label="Password"
              validate={[required, passwordLength, passwordSpaces]}
            />
          </div>

          <div className="ConfirmLoginPassword">
            <Field 
              name="confirmPassword"
              type="password"
              component={renderInputField}
              label="Confirm Password"
              validate={[required ]}
            />
          </div>

          <div className="FirstName">
            <Field 
              name="firstName"
              type="text"
              component={renderInputField}
              label="First Name"
              validate={[required]}
            />
          </div>

          <div className="LastName">
            <Field 
              name="lastName"
              type="text"
              component={renderInputField}
              label="Last Name"
              validate={[required]}
            />
          </div>

          <div className="Occupation">
            <Field 
              name="occupation"
              type="text"
              component={renderInputField}
              label="Occupation"
              validate={[required]}
            />
          </div>

          <div className="Bio">
            <Field 
              name="bio"
              type="text"
              component={renderTextArea}
              label="Tell us about yourself since high school"
              validate={[required]}
            />
          </div>

            {/* {(() =>{
              if (this.props.user.signInError) {
                return (
                  <div className="row">
                    <div className="">
                      <Error error={this.props.user.signInError}/>                    
                    </div>
                  </div>
                )
              }
            })()} */}
            <div className="row">
              <button className="btn btn-primary col-md-6 offset-md-3 col-xs-12" type="submit">CREATE ACCOUNT</button>
            </div>
        </form>
        </div>
        {/* <aside className="bro">
           Sign Up so
        </aside> */}
          <ModalWindow 
            animation= {true}
            showModal= {this.state.showModal} 
            title = "Registered!"
            content = "Thank you for registering! Don't forget to get your tickets!"
            //submit = "submit"
            cancel = "Close"
            onCancel = {(e)=>{this.setState({showModal:false});
            this.props.history.push('/login')}}
            onSubmit = {(e)=>{console.log("submit")}}
          />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ register : register}, dispatch);
}


Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default reduxForm({
  form: 'Register',
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(Register);