import axios from 'axios';

import { deleteCookie, setCookie, getCookie } from '../utils/cookies';

export const SIGN_IN_PENDING = "SIGN_IN_PENDING";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";
export const REGISTER_USER = "REGISTER_USER";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const WHO_IS_GOING = "WHO_IS_GOING";

export const userSignIn = ( email, password ) => {
    return function(dispatch){
        dispatch(signInPending(true));

        axios.post('user/login', {
            email: email,
            password: password
        })
        .then ((res )=> {
            dispatch(signInPending(false));
            if (res.data.status == "success"){
                setCookie('user', res.data.userInfo,  '/' );
                dispatch(signInSuccess(res.data));
            }
            else 
                dispatch(signInError("Invalid Username or Password"));
        })
        .catch (( err ) => {
            dispatch(signInPending(false));
            dispatch(signInError("We're experiencing technical difficulties, please try again later..."));
        })

    }
}

export const register = ( formValues ) => {
    return function(dispatch){

        axios.post('/user/register', {
            formValues: formValues
        })
        .then ((res )=> {
            console.log(res, ' registration success');
        })
        .catch (( err ) => {
            console.log(err, 'registration error');
        })

    }
}

export const whosGoing = (  ) => {
    return function(dispatch){

        axios.post('/user/whosgoing')
        .then ((res )=> {
            dispatch(whosAttending(res));
            console.log(res, 'whosgoing success');
        })
        .catch (( err ) => {
            console.log(err, 'whosgoing error');
        })

    }
}

export const whosAttending = ( data ) => {
    return {
        type: WHO_IS_GOING,
        payload: data
    }
}

export const signInPending = ( status ) => {
    return {
        type: SIGN_IN_PENDING,
        payload: status
    }
}

export const signInSuccess = ( status ) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: status
    }
}

export const signInError = ( status ) => {
    return {
        type: SIGN_IN_ERROR,
        payload: status
    }
}

export const signOut = () => {
    if (getCookie('user'))
        deleteCookie('user');
    return {
        type: SIGN_OUT,
        payload: {}
    }
}

export const registerUser = () => {
    return {
        type: REGISTER_USER,
        payload: {}
    }
}


export const clearErrors = ( ) => {
    return {
        type: CLEAR_ERRORS,
    }
}