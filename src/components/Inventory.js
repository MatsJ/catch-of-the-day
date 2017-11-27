import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render() {
        return(
            <div>
                <h2>Inventory</h2>
                {/* Pass function down to AddFishForm */}
                <AddFishForm addFish={this.props.addFish}/>
            </div>
            
        )
    }
}

export default Inventory;