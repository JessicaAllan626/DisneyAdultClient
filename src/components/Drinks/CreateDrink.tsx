import React from "react";

type TokenProps = {
    token: string | undefined | null,
}

type DrinkCreate = {
        name: string,
        alcohol: string,
        location: string,
        price: string,
        description: string,
}

class CreateDrink extends React.Component<TokenProps, DrinkCreate> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {
            name: '',
            alcohol: '',
            location: '',
            price: '',
            description: '',
        }
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        fetch(`https://localhost:3000/drinks/create`, {
            method: 'POST',
            body: JSON.stringify({
                drinks: {
                    name: this.state.name,
                    alcohol: this.state.alcohol,
                    location: this.state.location,
                    price: this.state.price,
                    description: this.state.description,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            alert('You have created a new Drink! Yay!')
            })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

    render() {
        return(
            <div>
                <form>
                    <h2>Create a Drink</h2>
                    <label htmlFor='name'>Name:</label>
                    <br/>
                    <input type='type' id='name' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />  
                    <br/>
                    <label htmlFor='alcohol'>Alcohol:</label>
                    <br/>
                    <input type='type' id='alcohol' value={this.state.alcohol} onChange={(e) => this.setState({alcohol: e.target.value})} />  
                    <br/>
                    <label htmlFor='location'>Location:</label>
                    <br/>
                    <textarea id='location' value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
                    <br/>
                    <label htmlFor='price'>Price:</label>
                    <br/>
                    <textarea id='price' value={this.state.price} onChange={(e) => this.setState({price: e.target.value})} />
                    <br/>
                    <label htmlFor='description'>Description:</label>
                    <br/>
                    <textarea id='description' value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
                    <br/>
                    <button type='submit' id='createTale' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateDrink;