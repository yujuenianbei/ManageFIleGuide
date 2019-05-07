// import { createStore } from 'redux';

// import middleware from 'src/middleware';
// import errorHandler from 'src/middleware/errorHandler';
// import reducer from 'src/reducers';
// import composeEnhancers from '../util/composeEnhancers';

// export default createStore(reducer, composeEnhancers(middleware, errorHandler));
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainsReducer } from '../reducers';

const reducer = combineReducers({
  main: mainsReducer,
})
const store = createStore(reducer, applyMiddleware(thunk));

export default store;