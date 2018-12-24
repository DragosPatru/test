import { constants } from '../constants/constants';


export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: constants.SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: constants.SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: constants.SET_LOGIN_ERROR,
    loginError
  }
}

function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'admin') {
      checkDbStatus(callback);
    } else {
    
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);
}

function checkDbStatus(callback) {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
  const url = constants.SERVER_URL + constants.MONGO_STATUS_ENDPOINT; 
  //return 
  //    .then(handleResponse);
  fetch(url, requestOptions)
      .then((resp) => {
        console.log("Handle response");
        console.log(resp);
        return resp.status
      }) 
      .then((data) => {
        if (data === 200) {
          // db connection is active
          callback(null);
        } else {
          callback(new Error('Mongo connection is no longer active !'));
        }
      })
      .catch((error) => {
        callback(new Error('Network Error !'));
      })
}