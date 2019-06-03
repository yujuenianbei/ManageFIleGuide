import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// store装填数据持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import {leftsReducer as leftReducer} from './left/redux/index';
import {rightsReducer as rightReducer} from './right/redux/index';
import {headersReducer as headerReducer} from './header/redux/index';
import {musicPlayReducer as musicReducer} from './play/index';
import {musicListReducer as musicSongListReducer} from './layout/musicList/redux/index';
import {imgListReducer as imgListReducer} from './layout/imgList/redux/index';
import {VideoListReducer as videoPlayerListReducer} from './layout/videoList/redux/index';
import {usersListReducer as userListReducer} from './layout/userList/redux/index';
import {loginsReducer as loginReducer} from './login/redux/index';

const reducer = combineReducers({
  header: headerReducer,
  left: leftReducer,
  right: rightReducer,
  login: loginReducer,
  userList: userListReducer,
  music: musicReducer,
  videoList: videoPlayerListReducer,
  musicList: musicSongListReducer,
  imgList: imgListReducer
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

