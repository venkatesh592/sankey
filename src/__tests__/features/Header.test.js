import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { useTranslation } from 'react-i18next';
import { Header } from '../../features';

let container = null
beforeEach(() => {
  container = render(
    <Provider store={store}>
      <Header title="Centime" />
    </Provider>
  );
})

test('renders With out fail', () => {
  expect(container.getByText('Centime')).toBeInTheDocument();
})

test('snapshot', () => {
  expect(container.asFragment()).toMatchSnapshot();
})

test('should change language', async () => {
  const { i18n } = useTranslation()
  fireEvent.mouseDown(container.getByRole('button'))
  const listbox = within(container.getByRole('listbox'))
  fireEvent.click(listbox.getByText(/French/i))
  expect(listbox).toBeTruthy()
})

afterAll(() => {
  jest.clearAllMocks()
})
