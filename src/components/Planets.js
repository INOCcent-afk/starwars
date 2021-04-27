import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets);

  return (
    <div>
      <h2>PLANET</h2>
      {status === "loading" && <div>loading data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
