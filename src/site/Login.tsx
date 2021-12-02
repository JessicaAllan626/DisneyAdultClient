import React from 'react';
// import APIURL from '../helpers/environment';

type LoginState = {
    email: string,
    password: string,
}

type SessionProps = {
    updateLocalStorage: (newToken: string) => void,
    clearLocalStorage: () => void,
}

class Login extends React.Component<SessionProps, LoginState> {

    constructor(props: SessionProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Login Submitted!')

        fetch(`http://localhost:3000/user/login`, {
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
        .catch((err) =>{
            console.log(`[Error]: ${err}`);
            this.props.clearLocalStorage();
        })
    }

    render() {
        return(
            <div>
                <form>
                    <h2>Login</h2>
                    <label htmlFor='email'>Email:</label>
                    <br/>
                    <input type='type' id='emailLogin' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} required/>  
                    <br/>
                    <label htmlFor='password'>Password:</label>
                    <br/>
                    <input type='password' id='passwordLogin' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} required/>
                    <br/>
                    <button type='submit' id='login' onClick={this.handleSubmit}>Login</button>
                </form>
            </div>
        )
    }
}

export default Login;