import React from 'react';
import { CardGroup, Card, Button } from 'reactstrap';

type TokenProps = {
    token: string | undefined | null,
}

type DrinkGetter = {
    name: string,
    alcohol: string,
    location: string,
    price: string,
    description: string,
    drinks: DrinkInfo[],
    id: string,
    update: boolean,
}

type DrinkInfo = {
    name: string,
    alcohol: string,
    location: string,
    price: string,
    description: string,
    id: string,
}

class GetDrink extends React.Component<TokenProps, DrinkGetter> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {
            name: '',
            alcohol: '',
            location: '',
            price: '',
            description: '',
            drinks: [],
            id: '',
            update: false,
        }
    }

    myDrinks = () => {
        fetch(`http://localhost:3000/drinks/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            this.setState({
                drinks: data,
                id: data.id,
            })
        })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

    componentDidMount() {
        this.myDrinks();
    } 

    deleteDrink = (id: any) => {
        alert('Drink deleted');
        fetch(`http://localhost:3000/drinks/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(() => this.myDrinks())
    }

    updateDrink = (id: any) => {
        alert('Drink has been updated')
        fetch(`http://localhost:3000/drinks/update/${id}`, {
            method: 'PUT',
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

    mapDrink = (props: any) => {
        return(
            props.drinks.map((drinks: DrinkInfo, index: number) => {
                return(
                    <div>
                        <CardGroup key={index}>
                                <Card className={'card'}>
                                    <h3><u>Disney Drinks</u></h3>
                                    <p>Name: {drinks.name}</p>
                                    <p>Alcohol: {drinks.alcohol}</p>
                                    <p>Location: {drinks.location}</p>
                                    <p>Price: {drinks.price}</p>
                                    <p>Description: {drinks.description}</p>
                                    <Button onClick={() => this.setState({update: !this.state.update})}>Update</Button>
                                    <Button onClick={() => this.deleteDrink(drinks.id)} >Delete</Button>  
                                    {this.state.update ? (
                                        //ADD IN DRINK PICS FOR CARDS
                                        <div>
                                        <form onSubmit={() => this.updateDrink(drinks.id)}>
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
                                            <button type='submit'>Submit</button>
                                        </form>
                                    </div>
                                    ): null }
                                </Card>
                        </CardGroup>
                    </div>
                )
            })
        )
    }

    render() {
        return(
            <div>
                <h3><u>My Disney Drinks</u></h3>
                <this.mapDrink name={this.state.name} alcohol={this.state.alcohol} location={this.state.location} price={this.state.price} description={this.state.description} drinks={this.state.drinks} />
            </div>
        )
    }
}


export default GetDrink;