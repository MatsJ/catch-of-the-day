import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
        //delete order
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if(!fish || fish.status === 'unavailable' ) {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>
        }

        return (
            <li key={key}>
                <span>
                    <CSSTransitionGroup
                        component='span'
                        className='count'
                        transitionName='count'
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                    >
                        <span key={count}>{count}</span>
                    </CSSTransitionGroup>
                    lbs {fish.name} {removeButton}</span>
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

                <CSSTransitionGroup 
                className="order"
                component="ul"
                transitionName="order"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>

            </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;