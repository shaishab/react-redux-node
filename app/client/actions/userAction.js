import axios from "axios";
import config from '../config/all'
let apiUrl = config.apiHost + config.apiExtension;
import history from '../history';

export function createUser(user) {
  return function (dispatch) {
    if(!user.userEmail) {
      dispatch({type: "USER_ACTION_REJECTED", result: 'User email is required!'})
    } else {
      dispatch({type: "USER_ACTION_PENDING"});
      axios.post(apiUrl+"/users", user)
        .then((response) => {
          console.log('response.data', response.data);
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
