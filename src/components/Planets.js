import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], () =>
    fetchPlanets(page)
  );

  return (
    <div>
      <h2>PLANET</h2>

      {status === "loading" && <div>loading data</div>}
      {status === "success" && (
        <div>
          <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => (!data || !data.next ? old : old + 1))
            }
          >
            Next Page
          </button>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
