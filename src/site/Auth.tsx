import React from 'react';
import { Button } from 'reactstrap';
import './auth.css';
import Login from './Login';
import Register from './Register';

type SessionProps = {
    updateLocalStorage: (newToken: string) => void,
    clearLocalStorage: () => void,
}

type loginToggle = {
    login: boolean,
}

class Auth extends React.Component<SessionProps, loginToggle> {
    constructor(props: SessionProps) {
        super(props)
        this.state = {
            login: false,
        }
    }
    render() {
        return(
            <div>
                <Button id='toggle' onClick={() => this.setState({login: !this.state.login})}>Login/Register</Button>
                {this.state.login ? 
                    (<Register updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} />) :
                    (<Login  updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} />)
                }  
            </div>
        )
    }
}

export default Auth;




// import React, { Component } from "react";
// import { Button, Form, FormGroup, Input } from "reactstrap";
// import "./auth.css";
// import APIURL from '../helpers/environment'

// type Authentication = {
//     email: string,
//     password: string,
//     login: boolean,
//     // userId: number | undefined,
// }

// type Props = {
//     updateToken: (newToken: string) => void
//     // setUser: (userId: number) => void
// }

// class Auth extends Component<Props, Authentication> {
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             login: true,
//             email: '',
//             password: '',
//             // userId: undefined,
//         }
//         // this.title = this.title.bind(this)
//         // this.loginToggle = this.loginToggle.bind(this)
//         // this.handleSubmit = this.handleSubmit.bind(this)
//     }
//     logSignButton = () => {
//         return !this.state.login ? 'Go Back To Sign In' : 'Sign Up'
//     }
//     title = () => {
//         return !this.state.login ? "Register to become a Disney Drinker" : "Login"

//     }
//     submitButton = () => {
//         return !this.state.login ? 'Create User' : 'Login'
//     }

//     loginToggle = (e: any) => {
//         e.preventDefault();
//         this.setState({
//             login: !this.state.login,
//             email: '',
//             password: '',
//         })
//     }

//     handleSubmit = (e: any) => {
//         e.preventDefault();
//         let reqBody = this.state.login ?
//             {
//                 user: {
//                     email: this.state.email,
//                     password: this.state.password,
//                 },
//             } : {
//                 user: {
//                     email: this.state.email,
//                     password: this.state.password,
//                 },
//             };
//         let url = this.state.login
//             ? `${APIURL}/user/login`
//             : `${APIURL}/user/register`;
//         console.log(reqBody);

//         fetch(url, {
//             method: "POST",
//             body: JSON.stringify(reqBody),
//             headers: new Headers({
//                 "Content-Type": "application/json",
//             }),
//         })
//             .then((response) => response.json())
//             .then(data => {
//                 console.log(data);
//                 this.setState({
//                     email: data.user.email,
//                     password: data.user.password,
//                     login: data.user.login,
//                     // userId: data.user.userId
//                 })
//                 this.props.updateToken(data.sessionToken);
//         });
//     };
//     render() {
//         return (
//             <div style={{ paddingTop: '75px' }}>
//                 {this.state.login ?
//                     (
//                         <div className="login-form">
//                             <Form onSubmit={this.handleSubmit}>
//                                 <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Not a Disney Drinker yet? Click here to register.</u></b></p>
//                                 <h1>{this.title()}</h1>
//                                 <br />
//                                 <FormGroup>
//                                     <Input placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} required type="email" id="email" value={this.state.email}></Input>
//                                 </FormGroup>
//                                 <br />
//                                 <FormGroup>
//                                     <Input placeholder='Password' onChange={(e) => this.setState({ password: e.target.value })} required type="password" id="password" value={this.state.password}></Input>
//                                 </FormGroup>
//                                 <br />
//                                 <Button type="submit" className="btn-lg btn-dark btn-block">Submit</Button>
//                                 <br />
//                             </Form>
//                         </div>
//                     ) : (
//                         <div className="register">
//                             <Form onSubmit={this.handleSubmit}>
//                                 <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Already a Disney Drinker? Login!</u></b></p>
//                                 <h1>{this.title()}</h1>
//                                 <br />
//                                 <FormGroup>
//                                     <Input placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} required type="email" id="email" value={this.state.email}></Input>
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Input placeholder='Password' onChange={(e) => this.setState({ password: e.target.value })} required type="password" id="password" value={this.state.password}></Input>
//                                 </FormGroup>
//                                 <Button type="submit" className="btn-lg btn-dark btn-block">Submit</Button>
//                                 <br />
//                             </Form>
//                         </div>
//                     )}
//             </div>
//         )
//     }
// }
// export default Auth;