import { screen, waitFor, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import data from './mocks/data';
import renderWithRouter from './utils/renderWithRouter'

describe('tests - page App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(data)
      })
    );
  });
  test('1', () => {
    render(<App />);
    waitFor(() => {
      expect(screen.getAllByRole('tr'))
      expect(screen.getAllByTestId("planetName")).toHaveLength(10);
    });
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.type(valueFilter, 0);
    userEvent.click(buttonFilter);
    waitFor(() => {
      expect(screen.getAllByTestId("planetName")).toHaveLength(8);
    });
  })
  test('02', () => {
    render(<App />)
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    
    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "menor que");
    userEvent.type(valueFilter, 300000);
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, "diameter");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, "surface_water");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.type(valueFilter, 300000);
    userEvent.click(buttonFilter);
    
    waitFor(() => {
      expect(screen.getByTestId("filter")).toHaveLength();
      const buttonDelete = screen.getAllByTestId("delete-filter")
      userEvent.click(buttonDelete[0])
      userEvent.click(buttonDelete[0])
      userEvent.click(buttonDelete[0])
    });
  })
  test('.3', () => {
    render(<App />)
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.type(valueFilter, 0);
    userEvent.click(buttonFilter);
  })
  test('.4', () => {
    render(<App />)
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.type(valueFilter, 300000);
    userEvent.click(buttonFilter);
  })
  test('5', () => {
    render(<App />)
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.type(valueFilter, 300000);
    userEvent.click(buttonFilter);
  })
});
