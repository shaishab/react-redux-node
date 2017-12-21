import axios from "axios";
import config from '../config/all'
let apiUrl = config.apiHost + config.apiExtension;
import history from '../history';

export function createUser(user) {
  return function (dispatch) {
    if(!user.email) {
      dispatch({type: "USER_ACTION_REJECTED", result: 'User email is required!'})
    } else {
      axios.post(apiUrl+"/users", user)
        .then((response) => {
          if(response.data.success) {
            dispatch({type: "CREATE_USER_FULFILLED", result: response.data});
            history.push('/user');
          } else {
            dispatch({type: "USER_ACTION_REJECTED", result: response.data.errorMsg});
          }
        }).catch((err) => {
        dispatch({type: "USER_ACTION_REJECTED", result: err})
      })
    }
  }
}

export function userLogin(user) {
  return function (dispatch) {
    if(!user.email) {
      dispatch({type: "USER_ACTION_REJECTED", result: 'User email is required!'})
    } else {
      axios.post(apiUrl+"/login", user)
        .then((response) => {
          if(response.data.success) {
            dispatch({type: "LOGIN_USER_FULFILLED", result: response.data});
            localStorage.setItem('user', JSON.stringify(response.data.user));
            history.push('/');
          } else {
            dispatch({type: "USER_ACTION_REJECTED", result: response.data.errorMsg});
          }
        }).catch((err) => {
        dispatch({type: "USER_ACTION_REJECTED", result: err})
      })
    }
  }
}

export function userLogOut() {
  return function (dispatch) {
    axios.post(apiUrl+"/logout")
      .then((response) => {
        if(response.data.success) {
          dispatch({type: "LOGOUT_USER_FULFILLED", result: response.data});
          localStorage.removeItem('user');
          history.push('/login');
        } else {
          dispatch({type: "USER_ACTION_REJECTED", result: response.data.errorMsg});
        }
      }).catch((err) => {
      dispatch({type: "USER_ACTION_REJECTED", result: err})
    })
  }
}

export function fetchUsers() {
  return function (dispatch) {
    axios.get(apiUrl+"/users")
    .then((response) => {
      dispatch({type: "FETCH_USER_FULFILLED", result: response.data})
    }).catch((err) => {
      dispatch({type: "USER_ACTION_REJECTED", result: err})
    })
  }
}
