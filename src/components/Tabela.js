// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ContextApp from '../Context/ContextApp';
import FiltersTxt from './FiltersTxt';
import FilterNum from './FilterNum';

function Tabela() {
  const { planetsFilter } = useContext(ContextApp);

  return (
    <>
      <FiltersTxt />
      <FilterNum />
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation period</th>
            <th>orbital peri </th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {planetsFilter.length > 0 && planetsFilter.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tabela;
