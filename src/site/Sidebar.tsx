import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Button, Navbar, NavItem, } from 'reactstrap';
import SplashPage from './Splash';
import DisneyDrinker from '../components/DisneyDrinker';
import React from 'react';


class Sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem('user')!)
        }
    }
    render() {
        console.log(this.props)
        return (
            <Router>
            <>
                <Navbar>
                        <div>
                            <nav>
                                    <NavItem>
                                        
                                            <Link to='/Drinks'>Disney Drinks</Link>
                                        
                                    </NavItem>
                                    <NavItem>
                                        
                                            <Link to='/DisneyDrinker'>Disney Drinker</Link>
                                        
                                    </NavItem>
                                    <NavItem>
                                        
                                            <Button onClick={() => this.props.clearToken()}>Logout</Button>
                                        
                                    </NavItem>
                                
                            </nav>
                        </div>
                </Navbar>
            <Routes>
                <Route path='/Drinks' element={<SplashPage token={this.props.token} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} drinksId={this.props.drinksId}  />} >
                </Route>
                <Route path='/DisneyDrinker' element={<DisneyDrinker token={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} drinks={this.props.drinks} drinksId={this.props.drinksId} id={this.props.id} reviews={this.props.reviews}/>} >
                </Route>
            </Routes>
            </>
        </Router>
        );
    }
};

export default Sidebar;