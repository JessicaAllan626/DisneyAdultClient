import React /*{ ReactElement, ReactNode }*/ from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Header from './components/site/Header';
import Home from './components/site/Home';
import Footer from './components/site/Footer';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout';
// import Role from './components/Auth/UserRole';


type TokenState = {
    sessionToken: string | undefined | null,
    // role: string | null,
}

class App extends React.Component<{}, TokenState> {

    constructor(props: TokenState) {
        super(props)
        this.state = {
            sessionToken: undefined,
            // role: '',
        }
        this.updateLocalStorage = this.updateLocalStorage.bind(this);
    }
    
    componentDidMount = (() => {
        if(localStorage.getItem('token')) {
            this.setState({
                sessionToken: localStorage.getItem('token'),
                // role: localStorage.getItem('role'),

            })
        }
    })    

    updateLocalStorage = (newToken: string) => {    
        localStorage.setItem('token', newToken);
        this.setState({
            sessionToken: newToken,
        })
    }

    // updateRole = (role: string) => {
    //     localStorage.setItem('role', role);
    //     this.setState({role: role})
    // }

    clearLocalStorage = () => {
        localStorage.clear();
        this.setState({
            sessionToken: undefined,
            // role: '',
        })
    }
    
    viewConductor = () => {
        return this.state.sessionToken === localStorage.getItem('token') ? 
            (<Home token={this.state.sessionToken} /> ) : (<Auth /*updateRole={this.updateRole}*/ updateLocalStorage={this.updateLocalStorage} clearLocalStorage={this.clearLocalStorage} />)

        }


    render() {
        return(
            <div className="App">
                <Header />
            
                {/* <h1>Welcome to Drinks Around Disney</h1>
                <p>This app allows you to view and review drinks that are found all over Disney Property!</p>
                 */}
                <Router>
                    {/* <Sidebar /> */}
                    {this.viewConductor()}
                </Router>

                <Logout clearLocalStorage={this.clearLocalStorage}/>

                <Footer />
        </div>
        )
    }
}

export default App;
