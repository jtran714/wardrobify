import React, { setItems } from "react";

function ShoesList(props) {
    // const [shoes, setItems] = React.useState(props.shoes);
    // const deleteShoe = (id) => async() => {
    //     const url = `http://localhost:8080/api/shoes/${id}`;
    //     const fetchConfig = {
    //         method: "delete"
    //     }
    //     const response = await fetch(url, fetchConfig)
    //     if (response.ok) {
    //         const deleted = await response.json();
    //     }
    //     setItems((shoes) => shoes.filter(shoe => {
    //         return shoe.id !== id}));
    //     }
    const [items, setItems] = React.useState(props.shoes);
    const deleteItem = (id) => async () => {
        const url = `http://localhost:8080/api/shoes/${id}`;
        const fetchConfig = {
            method: "delete"
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            const deleted = await response.json();
        }
        setItems((items) => items.filter(item => {
            return item.id !== id}));
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
          {items.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.model_name }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.bin }</td>
                <td><button onClick={deleteItem(shoe.id)} className="button">Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

export default ShoesList;
