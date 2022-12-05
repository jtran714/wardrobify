import React, { useState, useEffect, setItems } from "react";
import { Link } from 'react-router-dom';

function ShoesList() {
    const [shoes, setShoes] = useState([]);
    const getShoes = async () => {
      const shoesUrl = "http://localhost:8080/api/shoes/";
      const response = await fetch(shoesUrl);
      if (response.ok) {
        const listShoes = await response.json();
        setShoes(listShoes.shoes);
      }
    };
    useEffect(() => {
      getShoes();
    }, []);
    const deleteShoe = (id) => async () => {
      try {
        const url = `http://localhost:8080/api/shoes/${id}/`;
        const deleteResponse = await fetch(url,
            {
                method: "delete"
            }
        );

        if (deleteResponse.ok) {
          const reloadUrl = "http://localhost:8080/api/shoes/";
          const reloadResponse = await fetch(reloadUrl);
          const newShoes = await reloadResponse.json();
          setShoes(newShoes.shoes);
        }

      }
      catch (err) {

      }
    };

    if (shoes === undefined) {
      return null;
    }

    return (
      <div>
        <table className="table table-striped mt-lg">
            <thead>
            <tr>
                <th>Manufacturer</th>
                <th>Model Name</th>
                <th>Color</th>
                <th>Bin</th>
                <th>Picture</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {shoes.map(shoe => {
                return (
                <tr key={shoe.id}>
                    <td className="align-middle">{ shoe.manufacturer }</td>
                    <td className="align-middle">{ shoe.model_name }</td>
                    <td className="align-middle">{ shoe.color }</td>
                    <td className="align-middle">{ shoe.bin }</td>
                    <td className="align-middle"><img style={{width:100, height:100}} src={shoe.picture} /></td>
                    <td className="align-middle"><button onClick={deleteShoe(shoe.id)} className="btn btn-danger">Delete</button></td>
                </tr>
                );
            })}
            </tbody>
        </table>
        <p className="d-flex justify-content-center">
        <Link to="/shoes/new" className="btn btn-primary" href="#" role="button">Add a new shoe</Link>
        </p>
      </div>
    );
  }

export default ShoesList;
