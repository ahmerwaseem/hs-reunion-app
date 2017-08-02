import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import './LoginPage.css';
import classNames from 'classnames';
import { userSignIn, clearErrors } from '../../actions/users';
import { bindActionCreators } from 'redux'
import { required, email } from '../../utils/validators';
import Error from '../../components/Error/Error';


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
   input.onBlur(e.target.value);
  
  }


  return ( 
    <div className="form-group">

      <div className="row">
        <input className="form-control col-md-6 offset-md-3 col-xs-12" type={type} onInput={change} onBlur={blur} placeholder={label}/>
      </div>
      {(()=>{ 
        if (touched && error)
          return(
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <div className="" role="alert">
                  <Error error={error}/>
               </div>
            </div>
          </div>
          )
      })()}
    </div>
  )
}

class LoginPage  extends Component{
  constructor(props) {
    super(props);

    //this.props.userSignIn();


  }
  
  submit = (values) => {
    this.props.userSignIn(values.email, values.password);
  }

 componentWillMount(){
   window.scrollTo(0, 0);
    if (this.props.user.signedIn){
      this.props.history.push('/')
    }
  }

 componentDidUpdate(){
    if (this.props.user.signedIn){
      this.props.history.goBack();
    }
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render(){

    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (

      <div className = "LoginPage"> 
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h5> Please Log In </h5>
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
                validate={[required]}
              />
            </div>
          <div>
            {(() =>{
              if (this.props.user.signInError) {
                return (
                  <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                      <div className="" role="alert">
                        <Error error={this.props.user.signInError}/>
                      </div>                   
                    </div>
                  </div>
                )
              }
            })()}
            </div>
            <div className="row">
                <button className="btn btn-primary col-md-6 offset-md-3 col-xs-12" type="submit">LOGIN</button>
            </div>
            <div className="row">
            <Link className="col-md-6 offset-md-3 col-xs-12 register" to='/register'>Don't have an account? Register Here</Link>
            </div>
          
        </form>
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
  return bindActionCreators({ 
    userSignIn : userSignIn,
    clearErrors: clearErrors
    }, 
    dispatch);
}

LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

export default reduxForm({
  form: 'LoginPage',
})(LoginPage);