import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { DataPointList } from '../../features';
import { setSeriesData } from '../../features/sankey/sankeySlice';

let container = null
beforeEach(async () => {
  const point = {
    name: 'usage',
    itemStyle: {
      normal: {
        color: 'dummy',
        borderColor: 'dummy'
      }
    }
  }
  await store.dispatch(setSeriesData(point))
  container = render(
    <Provider store={store}>
      <DataPointList />
    </Provider>
  );
})

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
});

afterAll(() => {
  jest.clearAllMocks()
})
