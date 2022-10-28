// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ContextApp from '../Context/ContextApp';
import FiltersTxt from './FiltersTxt';
import FilterNum from './FilterNum';
import FilterOrder from './FilterOrder';

function Tabela() {
  const { planetsFilter } = useContext(ContextApp);

  return (
    <>
      <FiltersTxt />
      <FilterNum />
      <FilterOrder />
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
              <td data-testid="planet-name">{planet.name}</td>
              <td data-testid="planetRotation">{planet.rotation_period}</td>
              <td data-testid="planetOrbit">{planet.orbital_period}</td>
              <td data-testid="planetDinameter">{planet.diameter}</td>
              <td data-testid="planetClimate">{planet.climate}</td>
              <td data-testid="planetGravity">{planet.gravity}</td>
              <td data-testid="planetTerrain">{planet.terrain}</td>
              <td data-testid="planetSurfaceW">{planet.surface_water}</td>
              <td data-testid="planetPopulation">{planet.population}</td>
              <td data-testid="planetFilms">{planet.films}</td>
              <td data-testid="planetCreated">{planet.created}</td>
              <td data-testid="planetEdited">{planet.edited}</td>
              <td data-testid="planetURL">{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tabela;
