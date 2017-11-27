import React from 'react';

import sampleFishes from '../sample-fishes';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);

        //get initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }
    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
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
                    <ul className="list-of-fishes">
                    {/* loop over fishes */}
                        {/* gets current fish and passes in details about that fish */}
                        {
                            Object
                            .keys(this.state.fishes)
                            .map(key => <Fish key={key} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order />
                {/* Passing function down to Inventory.js */}
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;