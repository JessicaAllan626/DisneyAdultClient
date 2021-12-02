import React, { Component } from 'react';
import Auth from './Auth';
import Sidebar from './Sidebar';

type State = {
    sessionToken: string | undefined,
    userId: number | undefined
}

export default class Home extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            sessionToken: undefined,
            userId: undefined
        }
        this.updateToken = this.updateToken.bind(this);
        this.clearToken = this.clearToken.bind(this);
    }

    updateToken(newToken: string) {
        localStorage.setItem('token', newToken);
        this.setState({ sessionToken: newToken })
    }

    setUser( userId: number) {
        this.setState({ userId: userId })
    }

    clearToken() {
        localStorage.clear();
        this.setState({ sessionToken: undefined })
    }

    viewConductor = () => {
        return this.state.sessionToken !== undefined ? <Sidebar userId={this.state.userId} token={this.state.sessionToken} /> : <Auth updateLocalStorage={this.updateToken} clearLocalStorage={this.clearToken} />;
    };

    render() {
    return (
        <div>
            {this.viewConductor()}
        </div>
    )
    }
};

