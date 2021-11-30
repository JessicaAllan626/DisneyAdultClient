import React from 'react';
import './auth.css';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

type SessionProps = {
    updateLocalStorage: (newToken: string) => void,
    // updateRole: (role: string) => void,
    clearLocalStorage: () => void,
}

class Auth extends React.Component<SessionProps> {


    render() {
        return(
            <div>
                <Login /*updateRole={this.props.updateRole}*/ updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} />

                <br />
                <Register /*updateRole={this.props.updateRole}*/ updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} />

                <br />
                <Logout clearLocalStorage={this.props.clearLocalStorage} /> 
            </div>
        )
    }
}

export default Auth;