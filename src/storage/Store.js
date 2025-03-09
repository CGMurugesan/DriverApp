import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosMiddleware = ({ dispatch }) => next => action => {
  if (action.type !== 'API') return next(action);
  axios(action.payload)
    .then(({ data }) => dispatch({ type: action.meta.onSuccess, payload: data }))
    .catch(error => dispatch({ type: action.meta.onError, payload: error }));
};

const store = configureStore({
  reducer: {},
  middleware: [axiosMiddleware]
});

export default store;
