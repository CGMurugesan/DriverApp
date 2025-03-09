import Constant from "../../Constant/Constant";
import {
  API_LOGIN,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAIL,
} from "../ActionTypes/index";
const initialState = {
    apilogin: {},
  
  };
export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOGIN:
      return { ...state };
    case API_LOGIN_SUCCESS:
      return { ...state, apilogin: action.payload.data };
    case API_LOGIN_FAIL:
      return { ...state, apilogin: action.payload.data };

    default:
      return state;
  }
};

export function loginUser(data) {
  return {
    type: API_LOGIN,
    payload: {
      request: {
        method: "post",
        url: `${Constant.baseUrl}/api/Driver/Login`,
        data :data
      },
    },
  };
}
