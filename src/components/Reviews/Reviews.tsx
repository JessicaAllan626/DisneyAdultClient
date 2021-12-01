import React from 'react';
import './Reviews.css';
import ReviewIndex from './ReviewIndex';
import CreateReview from './CreateReview';

type TokenProps = {
    token: string | undefined | null,
}

class Reviews extends React.Component<TokenProps, {}> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div>
                <h2>Hello Disney Adults!</h2>
                <p>This is where you will be able to review a Disney Drink or see other Disney Adult drink reviews!</p>
                <CreateReview token={this.props.token} />
                <ReviewIndex token={this.props.token} />                
            </div>
        )
    }
}

export default Reviews;