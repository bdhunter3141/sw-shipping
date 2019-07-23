import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { rootReducer } from '../reducers/rootReducer';
import List from './List.js';

afterEach(cleanup)

// Function connects redux to tests
function renderWithRedux(
  ui,
  { initState, store = createStore(rootReducer, applyMiddleware(thunk), initState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

// Simple Loading Test
test('can render list page with redux', () => {
  const { getByTestId } = renderWithRedux(<List />)
  fireEvent.loadStart(getByTestId('fleet-collection'))
  expect(getByTestId('fleet-h4').tagName).toBe('H4');
})
