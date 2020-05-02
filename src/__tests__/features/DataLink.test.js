
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
store.dispatch = jest.fn()
import { DataLink } from '../../features';

let container = null
beforeEach(() => {
  container = render(
    <Provider store={store}>
      <DataLink />
    </Provider>
  )
  container.findByPlaceholderText
})

test('renders With out fail', () => {
  expect(container.getByText('Link Expenditure')).toBeInTheDocument();
});

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
});

test('should input takes values - Source Placeholder', async () => {
  const element = await container.findByPlaceholderText('Source Placeholder')
  fireEvent.change(element, { target: { value: 'Salary' } })
  expect(element).toBeTruthy()
  expect(element.value).toBe('Salary')
})

test('should input takes values - Target Placeholder', async () => {
  const element = await container.findByPlaceholderText('Target Placeholder')
  fireEvent.change(element, { target: { value: 'Grocery' } })
  expect(element).toBeTruthy()
  expect(element.value).toBe('Grocery')
})

test('should input takes values - Expenditure', async () => {
  const element = await container.findByPlaceholderText('Expenditure')
  fireEvent.change(element, { target: { value: 1200 } })
  expect(element).toBeTruthy()
  expect(element.value).toBe('1200')
})

test('should create links', async () => {
  const element = await container.findByText('Create')
  fireEvent.click(element.parentElement)
  const expectedAction = {
    payload: {
      source: '',
      target: '',
      value: ''
    },
    type: 'options/setSeriesLink'
  }
  expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
})

afterEach(cleanup)

afterAll(() => {
  jest.clearAllMocks()
})
