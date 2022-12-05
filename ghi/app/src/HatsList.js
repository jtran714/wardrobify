import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';




function HatsList() {
    const [hats, setHats] = useState([]);
    const getHats = async () => {
        const hatsUrl = "http://localhost:8090/api/hats/";
        const response = await fetch(hatsUrl);

        if (response.ok) {
            const listHats = await response.json();
            setHats(listHats.hats);
      }
    };

    
    useEffect(() => {getHats()}, []);

    const deleteHat = (id) => async () => {


      try {
        const url = `http://localhost:8090/api/hats/${id}/`;
        const deleteResponse = await fetch(url, 
            { 
                method: "delete" 
            }
        );

        if (deleteResponse.ok) {
          const refreshUrl = "http://localhost:8090/api/hats/";
          const reloadResponse = await fetch(refreshUrl);
          const newHats = await reloadResponse.json();
          setHats(newHats.hats);
        }

      } 
      catch (e) {
        
      }
    };

    if (hats === undefined) {
      return null;
    }




    return (
      <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fabric</th>
            <th>Style Name</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Location</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {hats.map((hat) => {
            return (
              <tr key={hat.id}>
                <td>{ hat.fabric }</td>
                <td>{ hat.style_name }</td>
                <td>{ hat.color }</td>
                <td><img style={{ width: 100, height: 100 }} src={hat.picture_url} /></td>
                <td>{ hat.location }</td>
                <td><button onClick={deleteHat(hat.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Create a new hat</Link>
      </div>
      </>
    );
  }
  



  export default HatsList;


