import React, { Component } from "react";
// import APIURL from '../helpers/environment';
import {Button} from 'reactstrap';

type ReviewState ={
    review: string
}

type Props = {
    token: string,
    drinksId: number,
}


class ReviewForm extends Component<Props, ReviewState> {
    constructor(props:Props) {
        super(props)

        this.state = {
            review: ''
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(this.props)
        fetch(`http://localhost:3000/review/create/${this.props.drinksId}`, {
            method: 'POST',
            body: JSON.stringify({review: {review: this.state.review}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` 
            }) 
        })
        .then(res => res.json())
        .then((reviewData) => {
            console.log(reviewData)
            })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

componentDidMount(){
}

    render() {
        return (
            <div>
                <form>
                    <h2>Update a Drink Review</h2>
                    <label htmlFor='review'>Rating:</label>
                        <select id='review' value={this.state.review} onChange={(e) => this.setState({review: e.target.value})} >
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
                    <Button type='submit' onClick={(e) => this.handleSubmit(e)} variant="contained">Submit</Button>
                </form>
            </div>
        )
    }
}


export default ReviewForm;


