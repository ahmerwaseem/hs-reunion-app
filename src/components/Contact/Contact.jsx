import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, change } from 'redux-form'
import './Contact.css';
import classNames from 'classnames';
 import { submitContactForm } from '../../actions/contact';
import { bindActionCreators } from 'redux'
import Error from '../../components/Error/Error';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

import { required, email } from '../../utils/validators';


const renderInputField = (props) => {
  const {
    input,
    label,
    name,
    type,
    id,
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
        <input className="form-control " id={id} type={type} onInput={change} onBlur={blur}/>
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
    id,
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
        <textarea rows="4" cols="50" className="form-control " id={id} type={type} onInput={change} onBlur={blur}/>
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

class Contact  extends Component{
  constructor(props) {
    super(props);

    this.state = {
      showModal : false
    }
    //this.props.userSignIn();


  }
  
  submit = (values) => {
    this.setState({
      showModal: true,
    })
    this.props.submitContactForm(values);
  }

  render(){

    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (

      <div className = "Contact"> 
        <div className= "ContactRightPanel">
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="row">
            <div className="LoginEmail col-md-6 offset-md-3 col-xs-12">
              <h5> Contact Us </h5>
            </div>
          </div>
            <div className="LoginEmail">
              <Field 
                name="email"
                id="email"
                type="text"
                component={renderInputField}
                label="Your Email"
                validate={[required, email]}
              />
            </div>

          <div className="Name">
            <Field 
              name="name"
              id="name"
              type="text"
              component={renderInputField}
              label="Your Name"
              validate={[required]}
            />
          </div>


          <div className="CommentBox">
            <Field 
              name="commentBox"
              id="commentBox"
              type="text"
              component={renderTextArea}
              label="Your Comments or Questions"
              validate={[required]}
            />
          </div>

          <div>
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
              <button className=" btn btn-primary col-md-6 offset-md-3 col-xs-12" type="submit">SUBMIT</button>
            </div>
          </div>
        </form>
        </div>
        {/* <aside className="bro">
           Sign Up so
        </aside> */}
          <ModalWindow 
            animation= {true}
            showModal= {this.state.showModal} 
            title = "Comment Submitted"
            content = "We will respond as soon as we can."
            //submit = "submit"
            cancel = "Close"
            onCancel = {(e)=>{this.setState({showModal:false})}}
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
  return bindActionCreators({ submitContactForm : submitContactForm}, dispatch);
}

const afterSubmit = (result, dispatch) =>{
  dispatch(reset('Contact'))
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("commentBox").value = "";
  
}

Contact = connect(
    mapStateToProps,
    mapDispatchToProps
)(Contact);

export default reduxForm({
  form: 'Contact',
  onSubmitSuccess: afterSubmit
})(Contact);