import React, { Component } from "react";
import DrinksIndex from './DrinkIndex';
// import APIURL from '../helpers/environment';
import {Button} from 'reactstrap'

        type DrinksState ={
            name: string;
            alcohol: string,
            location: string,
            price: string,
            description: string,
            drinks: DrinkInfo[]
        }

        type Props = {
            token: string,
            updateLocalStorage: any,
        }

        type DrinkInfo = {
            id: number,
            name: string,
            alcohol: string,
            location: string,
            price: string,
            description: string,
        }

class DrinkTable extends Component<Props, DrinksState> {
    constructor(props: Props) {
        super(props)

        this.state = {
            name: '',
            alcohol: '',
            location: '',
            price: '',
            description: '',
            drinks: []
        }

    }


    handleSubmit = (e: any) => {
        e.preventDefault()
        fetch(`http://localhost:3000/drinks/create`, {
            method: 'POST',
            body: JSON.stringify({drinks: {name: this.state.name, alcohol: this.state.alcohol, location: this.state.location, price: this.state.price, description: this.state.description }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` 
            }) 
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                name: data.name,
                alcohol: data.alcohol,
                location: data.location,
                price: data.price,
                description: data.description
            })
        })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

getDrinks(){
    fetch(`http://localhost:3000/drinks/mine`)
    .then(response => response.json())
    .then(response =>{
        console.log(response)
        this.setState({
            drinks: response
        })
    })
    .catch(err => console.log(err))
}

componentDidMount(){
    this.getDrinks()
}

    render() {
        return (
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
                    <input type='type' id='location' value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
                    <br/>
                    <label htmlFor='price'>Price:</label>
                    <br/>
                    <input type='type' id='price' value={this.state.price} onChange={(e) => this.setState({price: e.target.value})} />
                    <br/>
                    <label htmlFor='description'>Description:</label>
                    <br/>
                    <textarea id='description' value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
                    <br/>
                    <Button type='submit' onClick={(e) => this.handleSubmit(e)} variant="contained">Submit</Button>
                    </form>
                <DrinksIndex token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} drinks={this.state.drinks} />
            </div>
        )
    }
}


export default DrinkTable;

