const getPlanets = async () => {
  const request = await fetch('https://swapi.dev/api/planets');
  const requestJSON = await request.json();
  const planetsResults = requestJSON.results;
  await planetsResults.forEach((planeta) => {
    const plts = planeta;
    delete plts.residents;
  });
  return planetsResults;
};

export default getPlanets;
