import React from 'react';

type TokenProps = {
    token: string | undefined | null,
}

type ReviewCreate = {
    nameOfDrink: string,
    reviewEntry: string,
    rating: string,
}

class CreateReview extends React.Component<TokenProps, ReviewCreate> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {
            nameOfDrink: '',
            reviewEntry: '',
            rating: '',
        }
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('review entered');
        fetch(`http://localhost:3000/review/create`, {
            method: 'POST',
            body: JSON.stringify({
                review: {
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
            console.log(data);
            alert('Thanks for reviewing this drink!');
        })
        .catch((err) => console.log(`[Error}: ${err}]`))
    }

    render() {
        return(
            <div>
                <form>
                    <h2>Review a Drink!</h2>
                    <label htmlFor='nameOfDrink'>Drink Name:</label>
                    <br/>
                    <input type='type' id='nameOfDrink' value={this.state.nameOfDrink} onChange={(e) => this.setState({nameOfDrink: e.target.value})} />  
                    <br/>
                    <label htmlFor='rating'>Rating:</label>
                        <select id='rating' value={this.state.rating} onChange={(e) => this.setState({rating: e.target.value})} >
                        <option value = "1: This was not magical and it ruined my vacation">1: This was not magical and it ruined my vacation</option>
                        <option value = "2: Why do people drink this">2: Why do people drink this </option>
                        <option value = "3: Not my favorite but dont hate it">3: Not my favorite but I don't hate it</option>
                        <option value = "4: Deluxe resort vibes">4: Deluxe resort vibes</option>
                        <option value = "5: I would have an IV of this drink pumped into my veins">5: I would have an IV of this drink pumped into my veins</option>                       
                        </select>
                    <br/>
                    <label htmlFor='reviewEntry'>Entry:</label>
                    <br/>
                    <textarea id='reviewEntry' value={this.state.reviewEntry} onChange={(e) => this.setState({reviewEntry: e.target.value})} />
                    <br/>
                    <button type='submit' id='createReview' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateReview;