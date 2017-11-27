import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);

        //get initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }
    addFish(fish) {
        // update state
            // spread current state of fishes into variable
        const fishes = {...this.state.fishes};
            // add new fish
        const timestamp = Date.now();
        //give it unique name
        fishes[`fish-${timestamp}`] = fish;

        //set state
        this.setState({ fishes })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;