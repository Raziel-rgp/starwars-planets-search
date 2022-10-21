import React, { useContext } from 'react';
import ContextApp from '../Context/ContextApp';

function FiltersTxt() {
  const { setInputFilter } = useContext(ContextApp);

  const handleChange = ({ target }) => {
    const { value } = target;
    setInputFilter({ name: value });
  };

  return (
    <input
      data-testid="name-filter"
      id="input-filter"
      onChange={ handleChange }
    />
  );
}

export default FiltersTxt;
