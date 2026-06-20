import Link from "next/link";
import React from "react";

const RecipesComponent = (props) => {
  console.log(props);
  const { recipes } = props;
  return (
    <div>
      <h1>RecipesComponent</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">name</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r) => {
            return (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td><img src={r.image} width="80"/></td>
                <td><Link href={`/recipes/${r.id}`} className="btn btn-dark">See More...</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecipesComponent;
