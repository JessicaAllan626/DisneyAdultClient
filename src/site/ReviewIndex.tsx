import React from 'react';
import { CardGroup, Card } from 'reactstrap';
// import APIURL from '../helpers/environment';

type Props = {
    token: string,
    drinksId: number
}

type ReviewsState = {
    review: string,
    drinksId: number,
}

class GetReview extends React.Component<Props, {reviews: ReviewsState[]}> {

    constructor(props: Props) {
        super(props)
        this.state = {reviews: []}
    }

    getReviews = () => {
        fetch(`http://localhost:3000/review/${this.props.drinksId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            this.setState({
                reviews: res
            })
        })
        .catch((err) => console.log(`[Error]: ${err}`))
    }

    componentDidMount() {
        this.getReviews();
    }

    renderGetReview () {
        return this.state.reviews.map((review: ReviewsState, index: number) => {

            if (review.drinksId === this.props.drinksId){
                return(
                    <div>
                        <h3>Disney Drinks Reviews</h3>
                        <CardGroup key={index}>
                                <Card className={'card'}>
                                    <p>{review.review}</p>  
                                </Card>
                        </CardGroup>
                    </div>
                )
            }
            else {
                return null
            }
        }
    )
}
    render() {
        return(
            <div>
                <h3><u>My Drink Reviews</u></h3>
                <table id='reviews'>
                    <tbody>
                        {this.renderGetReview}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GetReview;