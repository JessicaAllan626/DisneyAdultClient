import React from 'react';
import { CardGroup, Card, Button } from 'reactstrap';

type TokenProps = {
    token: string | undefined | null,
}

type ReviewGet = {
    nameOfDrink: string,
    reviewEntry: string,
    rating: string,
    reviews: ReviewInfo[],
    id: string,
    update: boolean,
}

type ReviewInfo = {
    nameOfDrink: string,
    reviewEntry: string,
    rating: string,
    id: string,
}

class GetReview extends React.Component<TokenProps, ReviewGet> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {
            nameOfDrink: '',
            reviewEntry: '',
            rating: '',
            reviews: [],
            id: '',
            update: false, 
        }
    }

    myReviews = () => {
        fetch(`http://localhost:3000/reviews/mine`, {
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
                reviews: data,
                id: data.id,
            })
        })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

    componentDidMount() {
        this.myReviews();
    }

    deleteReview = (id: any) => {
        alert('Review has been deleted');
        fetch(`http://localhost:3000/reviews/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(() => this.myReviews())
    }

    updateReview = (id: any) => {
        alert('This review has been updated')
        fetch(`http://localhost:3000/reviews/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                reviews: {
                    nameOfDrink: this.state.nameOfDrink,
                    reviewEntry: this.state.reviewEntry,
                    rating: this.state.rating,
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
                nameOfDrink: data.nameOfDrink,
                reviewEntry: data.reviewEntry,
                rating: data.rating,
            })
        })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

    mapReview = (props: any) => {
        // console.log(props);
        return(
            props.reviews.map((reviews: ReviewInfo, index: number) => {
                return(
                    <div>
                        <h3>Disney Drinks Reviews</h3>
                        <CardGroup key={index}>
                                <Card className={'card'}>
                                    <p><b>Name: </b>{reviews.nameOfDrink}</p>
                                    <p><b>Entry: </b>{reviews.reviewEntry}</p>
                                    <p><b>Rating: </b>{reviews.rating}</p>
                                    <Button onClick={() => this.setState({update: !this.state.update})}>Update</Button>
                                    <Button onClick={() => this.deleteReview(reviews.id)} >Delete</Button>   
                                    {this.state.update ? (
                                        <div>
                                        <form onSubmit={() => this.updateReview(reviews.id)}>
                                            <h2>Update a Drink Review</h2>
                                            <label htmlFor='nameOfDrink'>Drink Name:</label>
                                            <br/>
                                            <input type='type' id='nameOfDrink' value={this.state.nameOfDrink} onChange={(e) => this.setState({nameOfDrink: e.target.value})} />  
                                            <br/>
                                            <label htmlFor='rating'>Rating:</label>
                                                <input type='select' id='rating' value={this.state.rating} onChange={(e) => this.setState({rating: e.target.value})} >
                                                <option></option>
                                                <option value = "1: This was not magical and it ruined my vacation">1: This was not magical and it ruined my vacation</option>
                                                <option value = "2: Why do people drink this">2: Why do people drink this </option>
                                                <option value = "3: Not my favorite but dont hate it">3: Not my favorite but I don't hate it</option>
                                                <option value = "4: Deluxe resort vibes">4: Deluxe resort vibes</option>
                                                <option value = "5: I would have an IV of this drink pumped into my veins">5: I would have an IV of this drink pumped into my veins</option>                       
                                                </input>
                                            <br/>
                                            <label htmlFor='reviewEntry'>Entry:</label>
                                            <br/>
                                            <textarea id='reviewEntry' value={this.state.reviewEntry} onChange={(e) => this.setState({reviewEntry: e.target.value})} />
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
                <h3><u>My Drink Reviews</u></h3>
                <this.mapReview nameOfDrink={this.state.nameOfDrink} rating={this.state.rating} reviewEntry={this.state.reviewEntry} reviews={this.state.reviews} />
            </div>
        )
    }
}

export default GetReview;