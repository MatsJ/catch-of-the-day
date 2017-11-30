import React from 'react';

/*
    Component to add fish to the inventory
*/
class AddFishForm extends React.Component {
    constructor() {
        super();
        this.createFish = this.createFish.bind(this);
        /*
            If you dont want a constructor you can put this instead : onSubmit={(e) => this.createFish(e)}
        */
    }

    createFish(event) {
        event.preventDefault();
        console.log('Gonna make some fish 🐠');
        // take values from input field and create fish object on every submit
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }

        // calls the addFish function made in App.js
        this.props.addFish(fish);
        // clears the inputfields when submiting.
        this.fishForm.reset();
    }
    render() {
        return(
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish}>
                <input ref={(input) => {this.name = input}} type="text" placeholder="Fish Name" />
                <input ref={(input) => {this.price = input}} type="text" placeholder="Fish Price" />
                <select ref={(input) => {this.status = input}}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input) => {this.desc = input}} type="text" placeholder="Fish Desc"></textarea>
                <input ref={(input) => {this.image = input}} type="text" placeholder="Fish Image" />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

AddFishForm.propTypes = {
    addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;