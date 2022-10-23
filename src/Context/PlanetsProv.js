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

  useEffect(() => {
    getPlanets().then((planetas) => {
      setPlanets(planetas);
    });
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
        return filterPlanet;
      }
      if (info.op === maiorQ) {
        return Number(planet[info.col]) > Number(info.num);
      }
      if (info.op === menorQ) {
        return Number(planet[info.col]) < Number(info.num);
      }
      return Number(planet[info.col]) === Number(info.num);
    }));
    setPlanetsFilter(pltFilter);
    deleteColItem();
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
    if (filtersSelected.length > 1) {
      console.log('foiii');
    }
    if (filtersSelected.length === 0) {
      setPlanetsFilter(planets);
    }
  };

  const allTrashButton = (col) => {
    if (!filterColumn.includes(col)) {
      setFilterColumn((current) => [...current, ...[col]]);
      const bla = filtersSelected.filter((selec) => selec.col !== col);
      setFiltersSelec(bla);
      setPlanetsFilter(planets);
    }
  };

  /* useEffect(() => {
    if (!filterColumn.includes(col)) {
      setFilterColumn((current) => [...current, ...[col]]);
      const bla = filtersSelected.filter((selec) => selec.col !== col);
      setFiltersSelec(bla);
      if (filtersSelected.length === 0) {
        setPlanetsFilter(planets);
      }
    }
    if (filtersSelected.length > 1) {
      console.log('foiii');
      func();
    }
    if (filtersSelected.length === 0) {
      setPlanetsFilter(planets);
    }
  }, [filtersSelected, func, filterColumn]); */

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
