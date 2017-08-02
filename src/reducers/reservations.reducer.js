import { UPDATE_RESERVATIONS } from '../actions/reservations';

export default function (state = null, action){

    switch(action.type){
        case UPDATE_RESERVATIONS:{
            return Object.assign({}, state,{ 
              reservationList: action.payload
            }
          );
        }
        default: return state;
    }
    return state;

}