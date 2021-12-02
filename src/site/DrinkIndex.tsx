import React from 'react';
import { CardGroup, Card } from 'reactstrap';
import ReviewIndex from './ReviewIndex';
import ReviewForm from './ReviewTable';

type Props = {
    token: string,
    updateLocalStorage: (newToken: string) => void,
    drinks: DrinkInfo[]
}

type DrinkInfo = {
    id: number,
    name: string,
    alcohol: string,
    location: string,
    price: string,
    description: string,
}



class DrinksList extends React.Component<Props, {}> {

    renderDrinksList() {
        return this.props.drinks.map((drinks: DrinkInfo, index: number) => {
            const { id, name, alcohol, location, price, description} = drinks
            return(
                    <div>
                        <CardGroup key={index}>
                                <Card className={'card'}>
                                    <div>
                                    <h3><u>Disney Drinks</u></h3>
                                    <p>Name: {name}</p>
                                    <p>Alcohol: {alcohol}</p>
                                    <p>Location: {location}</p>
                                    <p>Price: {price}</p>
                                    <p>Description: {description}</p>
                                    </div>
                                <ReviewIndex token={this.props.token} drinksId={id} />
                                <ReviewForm token={this.props.token} drinksId={id} />
                                </Card>
                        </CardGroup>
                    </div>
                )
            })
    }

    render() {
        return(
            <div>
                <h3><u>My Disney Drinks</u></h3>
                <tbody>
                    {this.renderDrinksList()}
                </tbody>
            </div>
        )
    }
}


export default DrinksList;


