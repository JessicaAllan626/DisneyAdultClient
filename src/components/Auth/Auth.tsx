import React from 'react';
import './auth.css';
import Login from './Login';
// import Logout from './Logout';
import Register from './Register';
import {Button} from 'reactstrap';

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
                <Button id='loginToggle' onClick={() => this.setState({login: !this.state.login})}>Login/Register</Button>
                <Login updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} />
                <br />
                <Register updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} />
                {/* <Logout clearLocalStorage={this.props.clearLocalStorage} />  */}
            </div>
        )
    }
}

export default Auth;