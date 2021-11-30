import React from "react";
import Sidebar from "./Sidebar";

type TokenProps = {
    token: string | undefined | null
}

class Home extends React.Component<TokenProps, {}> {

    constructor(props: TokenProps) {
        super(props)
        this.state = {

        }
    }
    

    render() {
        return(
            <div>
                <Sidebar token={this.props.token} />
            </div>
        )
    }
}

export default Home;