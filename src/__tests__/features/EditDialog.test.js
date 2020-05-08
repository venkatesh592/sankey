import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
store.dispatch = jest.fn()
import { EditDialog } from '../../features';

let container = null
beforeEach(() => {
  container = render(
    <Provider store={store}>
      <EditDialog open={true} onClose={() => {}} selectedValue={{ type: 'data'}} />
    </Provider>
  );
})

test('renders With out fail', () => {
  expect(container.getByText('* Use unique name')).toBeInTheDocument();
})

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
})

test('should input takes values - Latest Name', async () => {
  const element = await container.findByPlaceholderText('Latest Name')
  fireEvent.change(element, { target: { value: 'Salary' } })
  expect(element).toBeTruthy()
  expect(element.value).toBe('Salary')
})

test('should update name', async () => {
  const element = await container.findByText('Update')
  fireEvent.click(element.parentElement)
  const expectedAction = {
    payload: {
      index: undefined,
      name: ''
    },
    type: 'options/updateDataPointName'
  }
  expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
})

afterAll(() => {
  jest.clearAllMocks()
})
