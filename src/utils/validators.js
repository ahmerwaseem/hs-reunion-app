import axios from 'axios';

export const required = value => value ? ((value.trim().length != 0) ? undefined : 'Required') : 'Required';

export const passwordLength = value => { 
    if (value.length>=8) 
        return undefined
    else return "Password must be at least 8 characters long" }

export const passwordSpaces = value => {
    if (!value.match(/\s/g))
        return undefined
    else return "Password must not contain spaces"
}

export const email = value => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(value)) 
        return undefined
    else
        return "Please enter a valid email address";
}

export const asyncValidate = (value) => {
    return axios.post('/user/exists', { email : value.email })
        .then(res => {            
            if (res.data.exists == 'true'){
            throw { email: "This email is already registered" };
        } })
}