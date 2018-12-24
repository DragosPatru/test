import { constants } from '../constants/constants';

const initialState = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
  };

export function reducer(state = initialState, action) {
    switch (action.type) {
      case constants.SET_LOGIN_PENDING:
      console.log(constants.SET_LOGIN_PENDING);
      const newState = {
        ...state,
        loggedIn: true,
        isLoginPending: action.isLoginPending
        };

        console.log(newState);
        return {
            ...state,
            loggedIn: true,
            isLoginPending: action.isLoginPending
        };
      case constants.SET_LOGIN_SUCCESS:
        return {
            ...state,
            isLoginSuccess: action.isLoginSuccess
        };
  
      case constants.SET_LOGIN_ERROR:
        return {
            ...state,
            loginError: action.loginError
        };
  
      default:
        return state;
    }
  }