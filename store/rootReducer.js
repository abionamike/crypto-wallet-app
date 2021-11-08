import tabReducer from "./tab/tabReducers";
import marketReducer from "./market/marketReducer";
import { combineReducers } from 'redux';

export default combineReducers({
  tabReducer,
  marketReducer 
});

