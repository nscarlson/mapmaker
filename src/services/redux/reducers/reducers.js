import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const toggle = handleActions({
    TOGGLE: (state) => !state
}, true);

const reducers = combineReducers({
    toggle
});

export default reducers;
