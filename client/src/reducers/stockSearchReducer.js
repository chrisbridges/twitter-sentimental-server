import {SEARCH_STOCK_REQUEST, SEARCH_STOCK_SUCCESS, SEARCH_STOCK_ERROR, RETURN_TO_DEFAULT_STATE} from '../actions/stockSearchActions';

const initialState = {
  stock: null,
  sentimentScore: 0,
  tweets: [],
  positiveWords: {},
  negativeWords: {},
  loading: null,
  error: null
};

export function stockReducer(state=initialState, action) {
  if (action.type === SEARCH_STOCK_REQUEST) {
    return Object.assign({}, state, {
      stock: action.stock,
      loading: true,
      error: null
    });
  }

  if (action.type === SEARCH_STOCK_SUCCESS) {
    const positiveWordsCopy = {...state.positiveWords};
    const negativeWordsCopy = {...state.negativeWords};
    return Object.assign({}, state, {
      sentimentScore: state.sentimentScore + action.data.sentimentScore,
      tweets: [action.data.tweet, ...state.tweets],
      loading: !Boolean(action.data.tweet), // if no tweets have been received yet, consider that loading, once tweet has been received, no longer loading
      error: null,
      positiveWords: addWords(positiveWordsCopy, action.data.positiveWords),
      negativeWords: addWords(negativeWordsCopy, action.data.negativeWords)
    });
  }

  if (action.type === SEARCH_STOCK_ERROR) {
    return Object.assign({}, state, {
      stock: null,
      error: action.error,
      loading: false
    });
  }

  if (action.type === RETURN_TO_DEFAULT_STATE) {
    return Object.assign({}, initialState);
  }
  
  return state;
}

function addWords (wordObj, newWords) {
  if (newWords.length === 0) {
    return wordObj;
  }
  newWords.forEach(word => {
    wordObj[word] = (wordObj[word] || 0) + 1;
  });
  return wordObj;
}