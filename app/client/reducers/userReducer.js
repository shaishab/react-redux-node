'use strict';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { fetching: false, isLoggedIn: true, user } : {fetching: false, isLoggedIn: false};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_ACTION_PENDING': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'USER_ACTION_REJECTED': {
      return {
        ...state,
        success: false,
        fetching: false,
        message: action.result
      };
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        fetching: false,
        users: action.result.users
      };
    }
    case 'CREATE_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        fetching: false
      };
    }
    case 'LOGIN_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        isLoggedIn: true,
        fetching: false,
        user: action.result.user
      };
    }
    case 'LOGOUT_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        fetching: false,
        isLoggedIn: false,
        user: {}
      };
    }
  }
  return state;
};

export default userReducer;
