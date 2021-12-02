import React, { Component } from 'react';
// import APIURL from '../helpers/environment'
import {Card, Button, CardGroup} from 'reactstrap';


type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    drinksId: number,
    drinks: DrinkInfo[],
    id: number
}

type DrinksStates = {
    name: string,
    alcohol: string,
    location: string,
    price: string,
    description: string,
    drinks: DrinkInfo[] | never[]
}

type DrinkInfo = {
    name: string,
    alcohol: string,
    location: string,
    price: string,
    description: string,
    userId: number | undefined,
    id: number
}

class MyDrinks extends Component<Props, DrinksStates> {
    constructor(props: Props) {
        super(props)

        this.state={
            name: '',
            alcohol: '',
            location: '',
            price: '',
            description: '',
            drinks: [],
        }
    }

    MyDrinks(){
        fetch(`http://localhost:3000/drinks/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` 
            }) 
        })
        .then(response => response.json())
        .then(data=>{
            console.log("data: ", data)
            this.setState({
                drinks: data,
            })
        })
    }

    deleteDrinks(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`http://localhost:3000/drinks/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` 
            }) 
            }) 
        .then(response => response.json())
        .then(data => this.MyDrinks())
        .catch(err => console.log(err))
    }

    updateDrinks(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`http://localhost:3000/drinks/update/${id}`, { 
            method: 'PUT',
            body: JSON.stringify({drinks: {name: this.state.name, alcohol: this.state.alcohol, location: this.state.location, price: this.state.price, description: this.state.description}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`, 
            }) 
        })
        .then(response => response.json())
        .then(data => this.MyDrinks())
        .then(response =>{
            console.log(response)
            this.setState({
                name: '',
                alcohol: '',
                location: '',
                price: '', 
                description: ''
            })
        })
        .catch(err => console.log(err))
    }


    componentDidMount(){
        this.MyDrinks()
    }

    
    renderMyDrinks() {
        return this.props.drinks.map((drinks: DrinkInfo, index: number) => {
            return (
                <CardGroup key={index}>
                <Card className={'card'}>
                    <h3><u>Disney Drinks</u></h3>
                    <p>Name: {drinks.name}</p>
                    <p>Alcohol: {drinks.alcohol}</p>
                    <p>Location: {drinks.location}</p>
                    <p>Price: {drinks.price}</p>
                    <p>Description: {drinks.description}</p>
                        <div>
                        <form>
                            <h2>Update a Drink</h2>
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
                            <Button type='submit' onClick={(e) => this.updateDrinks(e, drinks.id)}>Submit</Button>
                        </form>
                    </div>
                </Card>
        </CardGroup>
        )
        })
    }



    render() {
        return (
            <div>
                <h1 id='tableName'>Disney Drinks</h1>
                <table id='drinkTable'>
                    <tbody>
                        {this.renderMyDrinks()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyDrinks;