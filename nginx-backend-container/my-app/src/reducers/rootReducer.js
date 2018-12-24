// can combine all reducers in the app into a single index reducer
// NOT WORKING
import { combineReducers } from 'redux';
import { reducer } from './authReducer';
export default combineReducers({
    reducer
});