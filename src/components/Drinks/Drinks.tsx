import React from 'react';
import './Drinks.css';
import DrinkIndex from './DrinkIndex';
import CreateDrink from './CreateDrink';

type TokenProps = {
    token: string | undefined | null,
}
class Drinks extends React.Component<TokenProps, {}> {

    constructor(props: TokenProps) {
        super(props)
        this.state = 
        {

        }
    }

    render() {
        return(
            <div>
                <h2>Disney Adult Drinks!</h2>
                <p>Here you can add a drink to the Disney Drinks board or view drinks that have already been added!</p>
                
                <CreateDrink token={this.props.token}/>

                <DrinkIndex token={this.props.token}/>
                
            </div>
        )
    }
}

export default Drinks;   