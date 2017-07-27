import 
  { SIGN_IN_PENDING,
    SIGN_IN_ERROR, 
    SIGN_IN_SUCCESS } 
from '../actions/users'

const initialState = {
  signedIn: false,
  signInPending: false,
  signInFail: null
}

export default function ( state = initialState , action ) {
  switch (action.type){
    case SIGN_IN_PENDING:{
      return Object.assign({}, state, {
      signInPending: action.payload
      });
    }
    case SIGN_IN_ERROR:{
      return Object.assign({}, state, {
      signInError: action.payload
      });
    }
    case SIGN_IN_SUCCESS:{
      return Object.assign({}, state, {
      signedIn: action.payload
      // data : {
      //    id..name.. 
      // }
      });
    }
    case SIGN_OUT:{
      return Object.assign({}, state, {
      initialState
      });
    }
  }
  return state;
}