import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalWindow.css'
import { Modal } from 'react-bootstrap';

const propTypes = {

};

const defaultProps = {

};

class ModalWindow  extends Component{
  constructor(props) {
    
    super(props);
    
  }

  render(){
  const { 
    showModal,
    title,
    content,
    onCancel,
    onSubmit,
    submit,
    cancel,
  } = this.props;

    return (

      <div className = "ModalWindow"> 
      {(()=>{
        if (showModal){
          return (
            <Modal.Dialog>

              <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <form>
              <Modal.Body>
                {this.props.children}
                {content}
              </Modal.Body>
              
              <Modal.Footer>
                { (submit != undefined) ?
                <button type="submit"
                  className="btn btn-primary"
                  onClick={(e)=>{
                    e.preventDefault() ; 
                    this.props.onSubmit() 
                    } 
                  }>
                  {submit}
                </button> : ""}
                <button 
                  className="btn btn-secondary" 
                  onClick={(e)=>{
                    e.preventDefault() ;
                    this.props.onCancel() 
                    } 
                  }>
                  {cancel}
                </button>
                
              </Modal.Footer>
              </form>

            </Modal.Dialog>
          )
        }
      })()}

      </div>
    )
  }

}

ModalWindow.propTypes = propTypes;
ModalWindow.defaultProps = defaultProps;

export default ModalWindow ;