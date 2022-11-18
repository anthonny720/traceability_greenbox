import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers'
import { composeWithDevTools } from '@redux-devtools/extension';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const middleware = [thunk];
const initialState = {};

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
const Persistor = persistStore(store);
export {Persistor};
export default store