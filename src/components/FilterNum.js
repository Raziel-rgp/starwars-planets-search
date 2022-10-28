import React, { useContext } from 'react';
import ContextApp from '../Context/ContextApp';

const filterOp = ['maior que', 'menor que', 'igual a'];

function FilterNum() {
  const { setColFilter,
    setOperator, setNumbers, filters,
    numbers, filtersSelected, filterColumn,
    trashButton, allTrashButton, deleteColItem,
    setPlanetsFilter, setFiltersSelec, colFilter,
    operator } = useContext(ContextApp);

  const handleOnChangeCol = ({ target }) => {
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    setColFilter({
      name: value,
    });
  };
  const handleOnChangeOp = ({ target }) => {
    const { value } = target;
    setOperator({
      name: value,
    });
  };
  const handleOnChangeNum = ({ target }) => {
    const { value } = target;
    setNumbers({ name: value });
  };

  return (
    <>
      <div>
        <select
          name="filterCol"
          onChange={ handleOnChangeCol }
          data-testid="column-filter"
        >
          {filterColumn.map((collumn, index) => (
            <option key={ index }>{collumn}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="filterOp"
          onChange={ handleOnChangeOp }
          data-testid="comparison-filter"
        >
          {filterOp.map((operators) => (
            <option key={ operators }>{operators}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          name="number"
          type="number"
          value={ numbers.name }
          data-testid="value-filter"
          onChange={ handleOnChangeNum }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            const pltFilter = filters();
            deleteColItem();
            setPlanetsFilter(pltFilter);
            setFiltersSelec((current) => [...current, ...[{
              col: colFilter.name,
              op: operator.name,
              num: numbers.name }]]);
          } }
        >
          FILTRAR
        </button>
      </div>
      <div>
        {filtersSelected.map((filter, index) => (
          <div
            key={ index }
          >
            <li data-testid="filter">
              {`${filter.col} ${filter.op} ${filter.num}`}
              <button
                type="button"
                data-testid="delete-filter"
                onClick={ () => trashButton(filter.col) }
              >
                lixeira
              </button>
            </li>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={ () => allTrashButton() }
            data-testid="button-remove-filters"
          >
            APAGADOR DE TUDO
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterNum;
