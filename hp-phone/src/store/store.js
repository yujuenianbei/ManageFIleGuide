// import { createStore } from 'redux';

// import middleware from 'src/middleware';
// import errorHandler from 'src/middleware/errorHandler';
// import reducer from 'src/reducers';
// import composeEnhancers from '../util/composeEnhancers';

// export default createStore(reducer, composeEnhancers(middleware, errorHandler));
import { createStore, combineReducers, applyMiddleware } from 'redux';
// store装填数据持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import { mainsReducer, classifiesReducer} from '../reducers';

const reducer = combineReducers({
  main: mainsReducer,
  classify: classifiesReducer
})

// 状态未持久化
// const store = createStore(reducer, applyMiddleware(thunk));
// export default store;

// 状态持久化 添加到localstorage
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)
export { store, persistor }