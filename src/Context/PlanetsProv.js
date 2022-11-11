import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import getPlanets from '../services/PlanetsAPI';

const maiorQ = 'maior que';
const menorQ = 'menor que';
const igualQ = 'igual a';

function PlanetsProv({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setInputFilter] = useState({ name: '' });
  const [planetsFilter, setPlanetsFilter] = useState([]);
  const [colFilter, setColFilter] = useState({ name: 'population' });
  const [operator, setOperator] = useState({ name: 'maior que' });
  const [numbers, setNumbers] = useState({ name: 0 });
  const [filtersSelected, setFiltersSelec] = useState([]);
  const [filterColumn, setFilterColumn] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [order, setOrder] = useState('ASC');
  const [orderFiltered, setOrderFiltered] = useState({});
  const [columnSort, setColumnSort] = useState('population');

  useEffect(() => {
    const apiSearch = async () => {
      getPlanets().then((planetas) => {
        setPlanets(planetas);
      });
    };
    apiSearch();
  }, []);

  useEffect(() => {
    const plFilter = planets.filter((planet) => {
      const filterPlanet = planet.name.includes(filterByName.name);
      return filterPlanet;
    });
    setPlanetsFilter(plFilter);
  }, [filterByName, planets]);

  const deleteColItem = () => {
    const arr = [];
    filterColumn.forEach((item) => {
      if (item !== colFilter.name) {
        arr.push(item);
      }
    });
    setColFilter(arr[0]);
    setFilterColumn(arr);
  };

  const filters = () => (
    planetsFilter.filter((planet) => {
      const pltp = planet.population;
      if (operator.name === 'maior que'
      && numbers.name === 0 && colFilter.name === 'population' && pltp === 'unknown') {
        const filterPlanet = delete planet.population === 'unknown';
        return filterPlanet;
      }
      if (operator.name === maiorQ) {
        return Number(planet[colFilter.name]) > Number(numbers.name);
      }
      if (operator.name === menorQ) {
        return Number(planet[colFilter.name]) < Number(numbers.name);
      }
      if (operator.name === igualQ) {
        return Number(planet[colFilter.name]) === Number(numbers.name);
      }
      return planetsFilter;
    })
  );

  const func = (newFilterSelected) => {
    const pltFilter = planets.filter((planet) => newFilterSelected.every((info) => {
      const pltp = planet.population;
      if (info.op === 'maior que'
          && info.num === 0
          && info.col === 'population' && pltp === 'unknown') {
        const filterPlanet = delete planet.population === 'unknown';
        console.log('if1= foi');
        return filterPlanet;
      }
      if (info.op === maiorQ) {
        console.log('if2= foi');
        return Number(planet[info.col]) > Number(info.num);
      }
      if (info.op === menorQ) {
        console.log('if3= foi');
        return Number(planet[info.col]) < Number(info.num);
      }
      console.log('if4= foi');
      return Number(planet[info.col]) === Number(info.num);
    }));
    console.log(pltFilter);
    setPlanetsFilter(pltFilter);
  };

  const trashButton = (col) => {
    if (!filterColumn.includes(col)) {
      setFilterColumn((current) => [...current, ...[col]]);
      const bla = filtersSelected.filter((selec) => selec.col !== col);
      setFiltersSelec(bla);
      func(bla);
      if (filtersSelected.length === 0) {
        setPlanetsFilter(planets);
      }
    }
  };

  const allTrashButton = (col) => {
    if (!filterColumn.includes(col)) {
      setFilterColumn((current) => [...current, ...[col]]);
      setFiltersSelec([]);
      setPlanetsFilter(planets);
    }
  };

  const orderSort = (orderFiltere) => {
    console.log(orderFiltere);
    console.log('fui clicado');
    const {
      columnSort: selectColumn,
      order: selectOrdenation } = orderFiltere;
    if (selectOrdenation === 'ASC') {
      const orderedPlanets = planets
        .sort(({ [selectColumn]: elementA }, { [selectColumn]: elementB }) => {
          console.log(elementA, elementB);
          if (elementA === 'unknown') {
            return 1;
          }
          if (elementB === 'unknown') {
            const menoUm = -1;
            return menoUm;
          }

          return elementB - elementA;
        })
        .sort(({ [selectColumn]: elementA }, { [selectColumn]: elementB }) => (
          elementA - elementB));
      setPlanetsFilter(orderedPlanets);
      return orderedPlanets;
    }
    if (selectOrdenation === 'DESC') {
      const orderedPlanets = planets
        .sort(({ [selectColumn]: elementA }, { [selectColumn]: elementB }) => {
          if (elementA === 'unknown') {
            return 1;
          }
          if (elementB === 'unknown') {
            const menoUm = -1;
            return menoUm;
          }
          return elementB - elementA;
        });
      setPlanetsFilter(orderedPlanets);
      return orderedPlanets;
    }
  };

  const contextValue = useMemo(() => ({
    planets,
    filters,
    setPlanets,
    filterByName,
    setInputFilter,
    planetsFilter,
    colFilter,
    setColFilter,
    operator,
    setOperator,
    numbers,
    setNumbers,
    filtersSelected,
    filterColumn,
    trashButton,
    allTrashButton,
    deleteColItem,
    setPlanetsFilter,
    setFiltersSelec,
    func,
    setOrder,
    order,
    setOrderFiltered,
    orderSort,
    columnSort,
    setColumnSort,
    orderFiltered,
  }));
  return (
    <ContextApp.Provider value={ contextValue }>
      {children}
    </ContextApp.Provider>
  );
}

PlanetsProv.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProv;
