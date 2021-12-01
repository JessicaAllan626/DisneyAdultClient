import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Header from './components/site/Header';
import Home from './components/site/Home';
import Footer from './components/site/Footer';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout';


type TokenState = {
    sessionToken: string | undefined | null,
}

class App extends React.Component<{}, TokenState> {

    constructor(props: TokenState) {
        super(props)
        this.state = {
            sessionToken: undefined,
        }
        this.updateLocalStorage = this.updateLocalStorage.bind(this);
    }
    
    componentDidMount = (() => {
        if(localStorage.getItem('token')) {
            this.setState({
                sessionToken: localStorage.getItem('token'),
            })
        }
    })    

    updateLocalStorage = (newToken: string) => {    
        localStorage.setItem('token', newToken);
        this.setState({
            sessionToken: newToken,
        })
    }

    clearLocalStorage = () => {
        localStorage.clear();
        this.setState({
            sessionToken: undefined,
        })
    }
    
    viewConductor = () => {
        return this.state.sessionToken === localStorage.getItem('token') ? 
            (<Home token={this.state.sessionToken} /> ) : (<Auth updateLocalStorage={this.updateLocalStorage} clearLocalStorage={this.clearLocalStorage} />)

        }


    render() {
        return(
            <div className="App">
                <Header />
                <Logout clearLocalStorage={this.clearLocalStorage}/>

                <Router>
                    {this.viewConductor()}
                </Router>

                <Footer />
        </div>
        )
    }
}

export default App;