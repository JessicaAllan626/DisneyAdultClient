import React from 'react';
import DrinkTable from './DrinkTable';
import Header from './Header';
import Footer from './Footer';

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
    drinksId: number,
}

function Splash(props: Props) {
    console.log(props)
    return (
        <div>
            <Header />
            <DrinkTable token={props.token} updateLocalStorage={props.updateLocalStorage}/>
            <Footer />
        </div>
    )
}

export default Splash;