function ShoesList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model Name</th>
            <th>Color</th>
            <th>Shoe URL</th>
            <th>Picture</th>
            <th>Bin</th>
          </tr>
        </thead>
        <tbody>
          {props.shoes.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.model_name }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.shoe_url }</td>
                <td>{ shoe.picture }</td>
                <td>{ shoe.bin }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default ShoesList;
