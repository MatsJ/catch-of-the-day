import React from 'react';

//components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    addFish = fish => {
        // take copy of existing state
        const fishes = {...this.state.fishes}

        // add new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // set new state
        this.setState({ fishes }); // same as fishes: fishes
    };
    render() {
        return(
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