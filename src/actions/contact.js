import axios from 'axios';

export const CONTACT = 'CONTACT';


export const submitContactForm = (formValues) => {
  return function (dispatch){
      axios.post('/contact', {formValues : formValues})
      .then(res => {   
        dispatch(contact(res));
      })
  }
}

export const contact = (res) =>{
  return {
      type: CONTACT,
      payload: res.data
  }
}