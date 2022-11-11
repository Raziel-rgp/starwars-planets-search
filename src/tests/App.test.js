import { screen, waitFor, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import React from 'react';
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
  test('verifica se a pagina contém os elementos corretos', () => {
    render(<App />);
    const nameFilter = screen.getByTestId("name-filter");
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    const buttonRMFilter = screen.getByTestId("button-remove-filters");
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("rotation period")).toBeInTheDocument();
    expect(screen.getByText("orbital peri")).toBeInTheDocument();
    expect(screen.getByText("climate")).toBeInTheDocument();
    expect(screen.getByText("gravity")).toBeInTheDocument();
    expect(screen.getByText("terrain")).toBeInTheDocument();
    expect(screen.getByText("surface water")).toBeInTheDocument();
    expect(screen.getByText("films")).toBeInTheDocument();
    expect(screen.getByText("created")).toBeInTheDocument();
    expect(screen.getByText("edited")).toBeInTheDocument();
    expect(screen.getByText("url")).toBeInTheDocument();

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(buttonRMFilter).toBeInTheDocument();
  });

  test('Verifica se columnFilter contém todas as opções corretas', () => {
    render(<App />);
    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter.options[0].value).toBe("population");
    expect(columnFilter.options[1].value).toBe("orbital_period");
    expect(columnFilter.options[2].value).toBe("diameter");
    expect(columnFilter.options[3].value).toBe("rotation_period");
    expect(columnFilter.options[4].value).toBe("surface_water");
  })

  test('Verifica se comparsonFilter contém todas as opções corretas', () => {
    render(<App />);
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    expect(comparisonFilter.options[0].value).toBe("maior que");
    expect(comparisonFilter.options[1].value).toBe("menor que");
    expect(comparisonFilter.options[2].value).toBe("igual a");

    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "menor que");
    userEvent.type(valueFilter, '300000');
    userEvent.click(buttonFilter);
    expect(valueFilter).toHaveValue(300000);

    expect(screen.getByTestId("filter")).toBeInTheDocument()
  })
  test('testando os botões', () => {
    render(<App />);
    const buttonFilter = screen.getByTestId("button-filter");
    const buttonRMFilter = screen.getByTestId("button-remove-filters");
    
    userEvent.click(buttonFilter);

    expect(screen.getByTestId("filter")).toBeInTheDocument()
    const deleteButton = screen.getByText("lixeira");
    expect(deleteButton).toBeInTheDocument()

    userEvent.click(deleteButton);
    userEvent.click(buttonRMFilter);

    waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    });

    const nameFilter = screen.getByTestId("name-filter");
    userEvent.type(nameFilter, "T")

    waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(1);
    });
  });

  test('Verifica se é renderizado todos elem da tabela', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    });
  })
});
