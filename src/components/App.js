import React from 'react';

import sampleFishes from '../sample-fishes';
import base from '../base';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

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

    // hook into the app component milliseconds before it is rendered to sync it with DB
    componentWillMount() {
        // this runs right before the app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        });

        //check if there is any order in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        
        if(localStorageRef) {
            //update app components order state
            this.setState({
                order: JSON.parse(localStorageRef) 
            });
        }
    }

    //if url changes stop tracking
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    // runs when props or state changes 
    componentWillUpdate(nextProps, nextState) {
         localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order)); 
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

    updateFish(key, updatedFish) {
        // take copy of fishes
        const fishes = {...this.state.fishes};
        //overwrite that one fish
        fishes[key] = updatedFish; 
        //change state of the fishes
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    addToOrder(key) {
        // take copy of the order state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update state with the new orders
        this.setState({ order })
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
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
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder}/>
                {/* Passing function down to Inventory.js */}
                <Inventory 
                    addFish={this.addFish} 
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes} 
                    updateFish={this.updateFish} 
                    removeFish={this.removeFish}
                />
            </div>
        )
    }
}

export default App;