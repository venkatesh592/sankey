import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
store.dispatch = jest.fn()
jest.mock('../../app/helpers/random-color', () => ({ getRandomColor: jest.fn().mockReturnValue('dummy-color') }))
import { DataPoint } from '../../features';

let container = null
beforeEach(() => {
  container = render(
    <Provider store={store}>
      <DataPoint />
    </Provider>
  );
})

test('renders With out fail', () => {
  expect(container.getByText('Create Entry')).toBeInTheDocument();
});

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
})

test('should input takes values - Usage Name Placeholder', async () => {
  const element = await container.findByPlaceholderText('Usage Name Placeholder')
  fireEvent.change(element, { target: { value: 'Grocery' } })
  expect(element).toBeTruthy()
  expect(element.value).toBe('Grocery')
})

test('should create Usage', async () => {
  const element = await container.findByText('Create')
  fireEvent.click(element.parentElement)
  const expectedAction = {
    payload: {
      itemStyle: {
        normal: {
          borderColor: 'dummy-color',
          color: 'dummy-color',
        }
      },
      name: ''
    },
    type: 'options/setSeriesData'
  }
  expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
})

afterAll(() => {
  jest.clearAllMocks()
})
