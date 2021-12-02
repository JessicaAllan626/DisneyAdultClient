import React, { Component } from 'react';
import MyDrinks from './Drinks';
import MyReviews from './Reviews';

type Props = {
    drinks: [],
    drinksId: number,
    id: number,
    reviews: []
    userId: number | undefined,
    token: string,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
}

class DisneyDrinker extends Component<Props, {}>{
    
render() {
  return (
    <div className="DisneyDrinker">
      <MyDrinks userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} drinksId={this.props.drinksId} drinks={this.props.drinks} id={this.props.id}/>
      <MyReviews userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} drinksId={this.props.drinksId} id={this.props.id} reviews={this.props.reviews}/>
    </div>
  );
}
}


export default DisneyDrinker;