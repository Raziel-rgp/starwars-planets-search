import React from 'react';
import { screen, waitFor, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from './mocks/data';

describe('tests - page App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(data)
      })
    );
  });
  test('primeiro if do provider', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
      expect(screen.queryAllByText("unknown")).toHaveLength(3);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    //ações usuario
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.click(buttonFilter)

    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(8);
      // expect(screen.queryAllByText("unknown")).toHaveLength(1);
    });
    userEvent.click(screen.getByTestId("button-remove-filters"))
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
      // expect(screen.queryAllByText("unknown")).toHaveLength(3);
    });
  })
  test('segundo if do provider', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    // ações usuario
    
    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "menor que");
    userEvent.type(valueFilter, "300000");
    userEvent.click(buttonFilter);
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(2);
    });
  })
  test('quarto if do provider', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    // ações usuario
    
    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.type(valueFilter, "0");
    userEvent.click(buttonFilter);


    userEvent.selectOptions(columnFilter, "diameter");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.click(buttonFilter);
    expect(screen.queryAllByTestId("delete-filter")).toHaveLength(2);
    const buttonDelete = screen.getAllByTestId("delete-filter")
    userEvent.click(buttonDelete[0])
  })
  test(' if do provider', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    // ações usuario
    
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    });
    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.type(valueFilter, "300000");
    userEvent.click(buttonFilter);


    userEvent.selectOptions(columnFilter, "diameter");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.click(buttonFilter);
    expect(screen.queryAllByTestId("delete-filter")).toHaveLength(2);
    const buttonDelete = screen.getAllByTestId("delete-filter")
    userEvent.click(buttonDelete[0])
    
  })
});
