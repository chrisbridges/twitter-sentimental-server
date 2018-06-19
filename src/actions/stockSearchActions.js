// import {API_BASE_URL} from '../config';
import openSocket from 'socket.io-client';
const socket = openSocket();

export const SEARCH_STOCK_REQUEST = 'SEARCH_STOCK_REQUEST';
export const searchStockRequest = stock => ({
  type: SEARCH_STOCK_REQUEST,
  stock
});

export const SEARCH_STOCK_SUCCESS = 'SEARCH_STOCK_SUCCESS';
export const searchStockSuccess = data => ({
  type: SEARCH_STOCK_SUCCESS,
  data
});

export const SEARCH_STOCK_ERROR = 'SEARCH_STOCK_ERROR';
export const searchStockError = error => ({
  type: SEARCH_STOCK_ERROR,
  error
});
// only possible w/ redux-thunk
export const subscribeToStock = stock => dispatch => {
  dispatch(searchStockRequest(stock));
  socket.emit('request-symbol', stock);
  socket.on(`symbol-${stock}`, data => {
    dispatch(searchStockSuccess(data));
  });
};


export const RETURN_TO_DEFAULT_STATE = 'RETURN_TO_DEFAULT_STATE';
export const returnToDefaultState = () => ({
  type: RETURN_TO_DEFAULT_STATE
});
