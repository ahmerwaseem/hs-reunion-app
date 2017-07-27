import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import './LoginPage.css';
import classNames from 'classnames';
import userSignIn from '../../actions/users';
import { bindActionCreators } from 'redux'


const validate = values => {
  console.log(values.email,"values");
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  console.log(errors);
  return errors;
}


const renderField = (props) => {
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
    <div className="form-group row">
      <div className="col-10">
        <input className="form-control" type={type} onInput={change} onBlur={blur} placeholder={label}/>
      </div>
      {(()=>{ 
        if (touched && error)
          return(
            <div>{error}</div>
          )
      })()}
    </div>
  )
}

class LoginPage  extends Component{
  constructor(props) {
    super(props);

    console.log(this.props," yo");
    //this.props.userSignIn();


  }
  
  submit = () => {
    this.props.userSignIn();
  }

 componentWillMount(){
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

    console.log(this.props," yo in render");
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (

      <div className = "LoginPage"> 
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="LoginEmail">
            <Field 
              name="email"
              type="text"
              component={renderField}
              label="Email"
            />
          </div>
          <div className="LoginPassword">
            <Field 
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">Submit</button>
            <button className="btn btn-secondary" >Clear</button>
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
  return bindActionCreators({ userSignIn : userSignIn}, dispatch);
}

LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

export default reduxForm({
  form: 'LoginPage',
  validate,
})(LoginPage);