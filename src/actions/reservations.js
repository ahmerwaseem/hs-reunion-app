
import axios from 'axios';
import { whosGoing } from './users';
export const UPDATE_RESERVATIONS = 'UPDATE_RESERVATIONS';


export const getReservations = () => {
  return function (dispatch){
      axios.get('/reservations')
      .then(res => {   
              dispatch(updateReservations(res));
      })
  }
}

export const rsvpEvent = (userID, eventID) => {
    console.log(userID, eventID);
  return function (dispatch){
      axios.post('/reservations/rsvp', { 
        userid: userID, 
        eventid: eventID 
      })
      .then(res => {   
              dispatch(updateReservations(res));
              dispatch(whosGoing());
      })
  }
}

export const cancelRsvp = (userID, eventID) => {
    console.log(userID, eventID);
  return function (dispatch){
      axios.post('/reservations/cancel', { 
        userid: userID, 
        eventid: eventID 
      })
      .then(res => {   
              dispatch(updateReservations(res));
              dispatch(whosGoing());
      })
  }
}


export const updateReservations = (res) =>{
  return {
      type: UPDATE_RESERVATIONS,
      payload: res.data
  }
}
