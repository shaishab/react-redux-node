'use strict';

const initialState = {
  fetching: false,
  fetched: false,
  success: true,
  users: [],
  user: {},
  message: null
};

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
        fetching: false,
        fetched: false,
        success: false,
        message: action.result
      };
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        success: true,
        users: action.result.users
      };
    }
    case 'CREATE_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        success: true
      };
    }
  }
  return state;
};

export default userReducer;
