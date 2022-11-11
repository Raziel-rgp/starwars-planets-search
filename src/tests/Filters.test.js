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
  test('verifica se a pagina contém os elementos corretos', async () => {
    render(<App />);
    const columnSortBNT = screen.getByTestId("column-sort-button");
    const columnSortASC = screen.getByTestId("column-sort-input-asc");
    const columnSortDESC = screen.getByTestId("column-sort-input-desc");
    const columnSort = screen.getByTestId("column-sort");

    expect(columnSortASC).toBeInTheDocument();
    expect(columnSortDESC).toBeInTheDocument();
    expect(columnSortBNT).toBeInTheDocument();

    expect(columnSort.options[0].value).toBe("population");
    expect(columnSort.options[1].value).toBe("orbital_period");
    expect(columnSort.options[2].value).toBe("diameter");
    expect(columnSort.options[3].value).toBe("rotation_period");
    expect(columnSort.options[4].value).toBe("surface_water");
  });
  test('should first', () => {
    render(<App />);

    const columnSortBNT = screen.getByTestId("column-sort-button");
    const columnSortASC = screen.getByTestId("column-sort-input-asc");
    const columnSortDESC = screen.getByTestId("column-sort-input-desc");
    const columnSort = screen.getByTestId("column-sort");

    userEvent.selectOptions(columnSort, "population");
    userEvent.click(columnSortDESC);
    userEvent.click(columnSortBNT);

    userEvent.selectOptions(columnSort, "orbital_period");
    userEvent.click(columnSortASC);
    userEvent.click(columnSortBNT);

    userEvent.selectOptions(columnSort, "diameter");
    userEvent.click(columnSortDESC);
    userEvent.click(columnSortBNT);

    userEvent.selectOptions(columnSort, "rotation_period");
    userEvent.click(columnSortASC);
    userEvent.click(columnSortBNT);

    userEvent.selectOptions(columnSort, "surface_water");
    userEvent.click(columnSortDESC);
    userEvent.click(columnSortBNT);
  })
});