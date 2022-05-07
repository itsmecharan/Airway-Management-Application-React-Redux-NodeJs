import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/Index';

const initialstate: any = {};
const middleware = [thunk];


const store = createStore(
    rootReducer,
    initialstate,
    applyMiddleware(...middleware),
);

export default store;