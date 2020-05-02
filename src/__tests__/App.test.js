import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';

let container = null
beforeEach(() => {
  container = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})

test('renders With out fail', () => {
  expect(container.getByText('Centime')).toBeInTheDocument();
});

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
});
