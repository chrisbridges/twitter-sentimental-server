import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {stockReducer} from './reducers/stockSearchReducer';

export default createStore(stockReducer, applyMiddleware(thunk));