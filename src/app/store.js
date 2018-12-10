import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import the root reducer
import tasks from './reducers/tasks';

//create an object for the default data
const defaultState = { tasks: [] };

const store = createStore(tasks, defaultState, applyMiddleware(thunk));

export default store;
