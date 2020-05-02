import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { Sankey } from '../../features';

let container = null
beforeEach(() => {
  container = render(
    <Provider store={store}>
      <Sankey />
    </Provider>
  );
})

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
});

afterAll(() => {
  jest.clearAllMocks()
})
