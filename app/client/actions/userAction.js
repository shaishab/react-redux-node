import axios from "axios"
import {toastr} from 'react-redux-toastr'

import config from '../config/all'
let apiUrl = config.apiHost + config.apiExtension;
import history from '../history';

export function userRegistration(user) {
  return function (dispatch) {
    dispatch({type: "USER_ACTION_PENDING"});
    if(!user.email) {
      dispatch({type: "USER_ACTION_REJECTED", result: 'User email is required!'})
    } else {
      axios.post(apiUrl+"/registration", user)
        .then((response) => {
          if(response.data.success) {
            dispatch({type: "REGISTRATION_USER_FULFILLED", result: response.data});
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

export function userLogin(user) {
  return function (dispatch) {
    dispatch({type: "USER_ACTION_PENDING"});
    if(!user.email) {
      let errorMsg = 'User email is required!';
      toastr.error('Error', errorMsg);
      dispatch({type: "USER_ACTION_REJECTED", result: errorMsg})
    } else {
      axios.post(apiUrl+"/login", user)
        .then((response) => {
          if(response.data.success) {
            dispatch({type: "LOGIN_USER_FULFILLED", result: response.data});
            localStorage.setItem('user', JSON.stringify(response.data.user));
            history.push('/');
          } else {
            toastr.error('Error', response.data.errorMsg);
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
    dispatch({type: "USER_ACTION_PENDING"});
    axios.post(apiUrl+"/logout")
      .then((response) => {
        if(response.data.success) {
          dispatch({type: "LOGOUT_USER_FULFILLED", result: response.data});
          localStorage.removeItem('user');
          history.push('/login');
        } else {
          toastr.error('Error', response.data.errorMsg);
          dispatch({type: "USER_ACTION_REJECTED", result: response.data.errorMsg});
        }
      }).catch((err) => {
      dispatch({type: "USER_ACTION_REJECTED", result: err})
    })
  }
}

export function oAuthProviderFinalCall(query) {
  return function (dispatch) {
    dispatch({type: "USER_ACTION_PENDING"});
    let userId = query.substring(8);
    axios.get(apiUrl+ `/users/profile/${userId}`)
      .then((response) => {
        if(response.data.success) {
          dispatch({type: "LOGIN_USER_FULFILLED", result: response.data});
          localStorage.setItem('user', JSON.stringify(response.data.user));
          history.push('/');
        } else {
          toastr.error('Error', response.data.errorMsg);
          dispatch({type: "USER_ACTION_REJECTED", result: response.data.errorMsg});
        }
      }).catch((err) => {
      toastr.error('Error', err);
      dispatch({type: "USER_ACTION_REJECTED", result: err})
    })
  }
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch({type: "USER_ACTION_PENDING"});
    axios.get(apiUrl+"/users")
    .then((response) => {
      dispatch({type: "FETCH_USER_FULFILLED", result: response.data})
    }).catch((err) => {
      dispatch({type: "USER_ACTION_REJECTED", result: err})
    })
  }
}

export function getProfile(userId) {
  return function (dispatch) {
    dispatch({type: "USER_ACTION_PENDING"});
    axios.get(apiUrl+"/users/profile/"+userId)
      .then((response) => {
        dispatch({type: "FETCH_PROFILE_FULFILLED", result: response.data})
      }).catch((err) => {
      dispatch({type: "USER_ACTION_REJECTED", result: err})
    })
  }
}

export function editProfile(user) {
  return function (dispatch) {
    dispatch({type: "USER_ACTION_PENDING"});
    if(!user._id ) {
      let errorMsg = 'Are you logged in?';
      toastr.error('Error', errorMsg);
      dispatch({type: "USER_ACTION_REJECTED", result: errorMsg})
    } else {
      axios.put(apiUrl+"/users/profile/"+user._id, user)
        .then((response) => {
          if(response.data.success) {
            dispatch({type: "USER_UPDATE_FULFILLED", result: response.data});
            localStorage.setItem('user', JSON.stringify(response.data.user));
            history.push('/profile');
          } else {
            toastr.error('Error', response.data.errorMsg);
            dispatch({type: "USER_ACTION_REJECTED", result: response.data.errorMsg});
          }
        }).catch((err) => {
        toastr.error('Error', err.message);
        dispatch({type: "USER_ACTION_REJECTED", result: err})
      })
    }
  }
}
