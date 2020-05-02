import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { DataLinkList } from '../../features';
import { setSeriesLink } from '../../features/sankey/sankeySlice';

let container = null
beforeEach(async () => {
  let link = {
    source: 'usage',
    target: 'usage 2',
    total: 123
  }
  await store.dispatch(setSeriesLink(link))
  container = render(
    <Provider store={store}>
      <DataLinkList />
    </Provider>
  );
})

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
});

afterAll(() => {
  jest.clearAllMocks()
})
