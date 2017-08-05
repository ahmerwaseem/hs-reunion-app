import 
  { SIGN_IN_PENDING,
    SIGN_IN_ERROR, 
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    CLEAR_ERRORS,
    WHO_IS_GOING,
    GET_ALL_USERS } 
from '../actions/users'

import { getCookie } from '../utils/cookies';

const cookie = getCookie('user');

const initialState = {
  signedIn: false,
  signInPending: false,
  signInError: null,
}

if (cookie){
  console.log("cookie call")
  initialState.userInfo = JSON.parse(cookie);
  initialState.signedIn = true;
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
        signInError: null,
        signedIn: true,
        userInfo: action.payload.userInfo
      });
    }
    case CLEAR_ERRORS:{
      return Object.assign({}, state, {
        signInError: null
      });
    }
    case WHO_IS_GOING:{
      return Object.assign({}, state, {
        whosGoing: action.payload.data
      });
    }
    case GET_ALL_USERS:{
      return Object.assign({}, state, {
        classmates: action.payload.data
      });
    }

    case SIGN_OUT:{
      return Object.assign({}, state, {
        signInError: null,
        signedIn :false,
        userInfo : { 
          userId: '',
          userEmail: '',
          userFirstName: '',
          userLastName: '',
          userOccupation:'',
          userBio: '',
        }
      });
    }
    default: return state;
  }
}
