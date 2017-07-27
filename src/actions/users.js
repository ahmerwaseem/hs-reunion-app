
export const SIGN_IN_PENDING = "SIGN_IN_PENDING";
export const SIGN_IN_ERROR = "SIGN_IN_FAIL";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";

const userSignIn = () => {
    return function(dispatch){
        dispatch(signInPending(true));
        //callservice.then(result)
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: true
        })
    }
}

const signInPending = ( status ) => {
    return {
        type: SIGN_IN_PENDING,
        payload: status
    }
}

const signInSuccess = ( status ) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: status
    }
}

const signInError = ( status ) => {
    return {
        type: SIGN_IN_ERROR,
        payload: status
    }
}

export default userSignIn;