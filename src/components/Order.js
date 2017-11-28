import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key) {
        //get fishes
        const fish = this.props.fishes[key];
        //get orders
        const count = this.props.order[key];

        if(!fish || fish.status === 'unavailable' ) {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available</li>
        }

        return (
            <li key={key}>
                <span>{count}lbs {fish.name}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render() {
        // goes through orders
        const orderIds = Object.keys(this.props.order);
        // returns a single value
        const total = orderIds.reduce((prevTotal, key) => {
            // gets fishes
            const fish = this.props.fishes[key];
            //gets orders
            const count = this.props.order[key];
            // if fish is available return price and add upp
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }
            return prevTotal;
        }, 0);
        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order;