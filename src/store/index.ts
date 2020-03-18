import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';

import rootReducer from './ducks/rootReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export { store };
