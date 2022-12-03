import React from 'react';

class NewShoe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bins: [],
            bin: '',
            manufacturer: '',
            model_name: '',
            picture: '',
            color: '',
         };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.bins;
        console.log(data);

        const shoesUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoesUrl, fetchConfig);
        if (response.ok) {
          const newShoe = await response.json();
          console.log(newShoe);

          this.setState({
            bin: '',
            manufacturer: '',
            model_name: '',
            picture: '',
            color: '',
          });
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value })
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            this.setState({bins: data.bins});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoe</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoe">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" value={this.state.manufacturer} />
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control" value={this.state.model_name} />
                                <label htmlFor="model_name">Model Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={this.state.color}/>
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} placeholder="Picture Url" required type="url" name="picture" id="picture" className="form-control" value={this.state.picture}/>
                                <label htmlFor="picture">Picture</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChange} required name="bin" id="bin" className="form-select" value={this.state.bin}>
                                    <option value="">Choose a bin</option>
                                    {this.state.bins.map(bin => {
                                        return (
                                            <option key={bin.id} value={bin.href}>
                                                {bin.bin_number}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewShoe;
