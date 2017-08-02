import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import eventReducer from './events.reducer';
import reservationReducer from './reservations.reducer';
import { reducer as formReducer } from 'redux-form' 

const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
  reservations: reservationReducer,
  form: formReducer,
});

export default rootReducer; 