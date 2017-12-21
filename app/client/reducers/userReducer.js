'use strict';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_ACTION_REJECTED': {
      return {
        ...state,
        success: false,
        message: action.result
      };
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        users: action.result.users
      };
    }
    case 'CREATE_USER_FULFILLED': {
      return {
        ...state,
        success: true
      };
    }
    case 'LOGIN_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        isLoggedIn: true,
        user: action.result.user
      };
    }
    case 'LOGOUT_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        isLoggedIn: false,
        user: {}
      };
    }
  }
  return state;
};

export default userReducer;
