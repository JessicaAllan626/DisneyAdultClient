import React from 'react';
// import APIURL from '../helpers/environment';

type RegisterState = {
    email: string,
    password: string,
}

type SessionProps = {
    updateLocalStorage: (newToken: string) => void,
    clearLocalStorage: () => void,
}

class Register extends React.Component<SessionProps, RegisterState> {

    constructor(props: SessionProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Register Submitted!')

        fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.props.updateLocalStorage(data.sessionToken)
        })
        .catch((err) => {
            alert(`[Error}: ${err}]`);
            this.props.clearLocalStorage();
        })
    }

    render() {
        return(
            <div>
                <form>
                    <h2>Register</h2>
                    <label htmlFor='email'>Email:</label>
                    <br/>
                    <input type='email' id='email' required value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />  
                    <br/>
                    <label htmlFor='password'>Password:</label>
                    <br/>
                    <input type='password' id='password' required value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                    <br/>
                    <button type='submit' id='register' onClick={this.handleSubmit}>Register!</button>
                </form>

            </div>
        )
    }
}

export default Register;