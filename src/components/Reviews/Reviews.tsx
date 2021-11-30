import React from 'react';
import './Reviews.css';
import CreateReview from './CreateReview';
import ReviewIndex from './ReviewIndex';

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

                <CreateReview token={this.props.token} />
                <ReviewIndex token={this.props.token} />                
            </div>
        )
    }
}

export default Reviews;