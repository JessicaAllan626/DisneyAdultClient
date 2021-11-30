import React from 'react';
import {Route, Link, Routes} from 'react-router-dom';
import './site.css';
import Reviews from "../Reviews/Reviews";
import Drinks from "../Drinks/Drinks";
import Home from "./Home";


type TokenProps = {
    token: string | undefined | null,
}

class Sidebar extends React.Component<TokenProps, {}> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {

        }
    }

    render() {
    return(
        <div className='sidebar'>
            <div>
                <ul id='sidebarList'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/drinks'>Drinks</Link></li>
                    <li><Link to='/reviews'>Reviews</Link></li>
                </ul>
            </div>
            <div>
                <Routes>
                    <Route path='/' element={<Home token={this.props.token} />} />
                    <Route path='/drinks' element={<Drinks token={this.props.token} />} />
                    <Route path='/reviews' element={<Reviews token={this.props.token} />} />
                </Routes>
            </div>

        </div>
    )
    }
} 

export default Sidebar;