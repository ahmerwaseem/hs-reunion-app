import { GET_EVENTS } from '../actions/events';

export default function (state = null, action){

    switch(action.type){
        case GET_EVENTS:{
            return Object.assign({}, state, {
            eventList: action.payload
            });
        }
        default: return state;
    }
    return state;

}