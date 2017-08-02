import axios from 'axios';

export const GET_EVENTS = 'GET_EVENTS';


export const getEvents = () => {
  return function (dispatch){
      axios.get('/events')
      .then(res => {   
              dispatch(events(res));
      })
  }
}

export const events = (res) =>{
  return {
      type: GET_EVENTS,
      payload: res.data
  }
}

