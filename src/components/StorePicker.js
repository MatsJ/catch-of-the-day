import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    // constructor of component
    constructor() {
        super();
        this.goToStore = this.goToStore.bind(this);
        // can also go down to onSubmit and type this.goToStore.bind(this)
        // but this creates an own function every time StorePicker is used
    }
    
    // go to the store the user gets at root
    goToStore(event) {
        event.preventDefault();
        // first grab text from box
        const storeId = this.storeInput.value;
        // second we will transition from / to /store/:storeId    
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} 
                ref={(input) => {this.storeInput = input}}/>
                {/*ref={(input) => {this.storeInput = input}* pulls the value of the input field
                this is the preferred way of doing in it react*/}
                <button type="submit">Visit Store ➡️</button>
            </form>
        )
    }
}

// tells react that storepicker expects something called a router
//gets the context
StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;