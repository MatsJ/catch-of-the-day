import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render() {
        return(
            <div>
                <h2>Inventory</h2>
                {/* Pass function down to AddFishForm */}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample fishes</button>
            </div>
            
        )
    }
}

export default Inventory;