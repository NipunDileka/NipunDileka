import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistStore ,persistReducer } from 'redux-persist';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from '@redux-saga/core';
import {rootSaga} from './root-saga'



const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const sagaMiddleware =createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer);



const middleWares = [process.env.NODE_ENV === 'development' && logger,sagaMiddleware].filter(Boolean);


const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__)|| compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)