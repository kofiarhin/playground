const createSlice = ({ name, initialState, reducers }) => {
  if (!name) {
    throw new Error('createSlice requires a name.');
  }

  const actionCreators = {};
  const caseReducers = {};

  Object.entries(reducers).forEach(([key, reducer]) => {
    const type = `${name}/${key}`;
    caseReducers[type] = reducer;
    actionCreators[key] = (payload) => ({ type, payload });
  });

  const sliceReducer = (state = initialState, action) => {
    const reducer = caseReducers[action.type];
    if (!reducer) {
      return state;
    }

    const draft = typeof structuredClone === 'function' ? structuredClone(state) : JSON.parse(JSON.stringify(state));
    const result = reducer(draft, action);
    return result === undefined ? draft : result;
  };

  return { reducer: sliceReducer, actions: actionCreators, name };
};

const combineReducers = (reducersMap) => (state = {}, action) => {
  const nextState = {};
  let hasChanged = false;
  Object.entries(reducersMap).forEach(([key, reducer]) => {
    const previous = state[key];
    const next = reducer(previous, action);
    nextState[key] = next;
    hasChanged = hasChanged || next !== previous;
  });
  return hasChanged ? nextState : state;
};

const configureStore = ({ reducer }) => {
  const rootReducer = typeof reducer === 'function' ? reducer : combineReducers(reducer);
  let currentState = rootReducer(undefined, { type: '@@INIT' });
  const listeners = new Set();

  const getState = () => currentState;

  const dispatch = (action) => {
    currentState = rootReducer(currentState, action);
    listeners.forEach((listener) => listener());
    return action;
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, dispatch, subscribe };
};

export { createSlice, configureStore };
