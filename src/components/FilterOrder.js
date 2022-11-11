import React, { useContext } from 'react';
import ContextApp from '../Context/ContextApp';

function FilterOrder() {
  const { setOrder,
    order,
    setOrderFiltered,
    columnSort,
    orderSort,
    setColumnSort } = useContext(ContextApp);

  const optionsSort = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const handleOnClick = () => {
    setOrderFiltered(({
      order,
      columnSort,
    }));
    orderSort({
      order,
      columnSort,
    });
  };

  const handleOrder = ({ target: { value } }) => {
    setOrder(value);
  };

  const handleChangeColumn = ({ target: { value } }) => {
    setColumnSort(value);
  };

  return (
    <>
      <div>
        <select
          name="filterCol"
          onChange={ handleChangeColumn }
          data-testid="column-sort"
        >
          {optionsSort.map((collumn, index) => (
            <option key={ index }>{collumn}</option>
          ))}
        </select>
      </div>
      <label htmlFor="asc">
        <input
          data-testid="column-sort-input-asc"
          id="asc"
          type="radio"
          value="ASC"
          checked={ order === 'ASC' }
          onChange={ handleOrder }
        />
        ASC
      </label>
      <label htmlFor="desc">
        <input
          id="desc"
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          checked={ order === 'DESC' }
          onChange={ handleOrder }
        />
        DESC
      </label>
      <div>
        <button
          data-testid="column-sort-button"
          id="orderBT"
          type="button"
          onClick={ () => handleOnClick() }
        >
          ordenar
        </button>
      </div>

    </>
  );
}

export default FilterOrder;
