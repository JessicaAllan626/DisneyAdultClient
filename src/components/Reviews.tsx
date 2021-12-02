import React, { Component } from 'react';
// import APIURL from '../helpers/environment';
import {Card, Button, CardGroup} from 'reactstrap'

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    drinksId: number,
    id: number,
    reviews: ReviewInfo[]
}

type ReviewState = {
    review: string
    reviews: []
}

type ReviewInfo = {
    userId: number | undefined,
    review: string,
    id: number
}

class MyReviews extends Component<Props, ReviewState> {
    constructor(props: Props) {
        super(props)

        this.state={
            review: '',
            reviews: []
        }
    }

    getReviews(){
        fetch(`http://localhost:3000/review/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` 
            }) 
        })
        .then(response => response.json())
        .then(response =>{
            console.log(response)
            this.setState({
                reviews: response
            })
        })
        .catch(err => console.log(err))
    }

    deleteReviews(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`http://localhost:3000/review/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` 
            }) 
            }) 
        .then(response => response.json())
        .then(data => this.getReviews())
        .catch(err => console.log(err))
    }

    updateReviews(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`http://localhost:3000/review/update/${id}`, { 
            method: 'PUT',
            body: JSON.stringify({reviews: {review: this.state.review}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`, 
            }) 
        })
        .then(response => response.json())
        .then(data => 
            
            {
                console.log(data)
                this.getReviews()})
        .catch((err) => console.log(err))
    };

    componentDidMount(){
        this.getReviews()
    }

    
    renderMyReviews() {
        return this.state.reviews.map((review: ReviewInfo, index: number) => {
            console.log(review)
            return (
                <CardGroup key={index}>
                <Card className={'card'}>
                    <h3><u>Disney Drinks Reviews</u></h3>
                    <p>Name: {review.review}</p>
                        <div>
                        <form>
                            <h2>Update a Drink Review</h2>
                            <label htmlFor='rating'>Review:</label>
                                <select id='rating' value={this.state.review} onChange={(e) => this.setState({review: e.target.value})} >
                                <option></option>
                                <option value = "1: This was not magical and it ruined my vacation">1: This was not magical and it ruined my vacation</option>
                                <option value = "2: Why do people drink this">2: Why do people drink this </option>
                                <option value = "3: Not my favorite but dont hate it">3: Not my favorite but I don't hate it</option>
                                <option value = "4: Deluxe resort vibes">4: Deluxe resort vibes</option>
                                <option value = "5: I would have an IV of this drink pumped into my veins">5: I would have an IV of this drink pumped into my veins</option>                       
                                </select>
                            <br/>
                            {/* <label htmlFor='review'>Entry:</label>
                                <br/> */}
                            {/* <textarea id='review' value={this.state.reviewEntry} onChange={(e) => this.setState({review: e.target.value})} />
                                <br/> */}
                            <Button onClick={(e) => this.updateReviews(e, review.id)} >Update</Button>                                        
                            </form>
                    </div>
                </Card>
        </CardGroup>
            )}
        )}



    render() {
        return (
            <div>
                <h1 id='tableName'>Drink Reviews</h1>
                <table id='reviews'>
                    <tbody>
                        {this.renderMyReviews()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyReviews;