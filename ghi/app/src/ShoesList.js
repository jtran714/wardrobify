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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model Name</th>
            <th>Color</th>
            <th>Bin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {shoes.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.model_name }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.bin }</td>
                <td><button onClick={deleteShoe(shoe.id)} className="button">Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default ShoesList;
