import React from "react";
import PropTypes from "prop-types";

//components
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    // reference to piece of data
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // take copy of existing state
    const fishes = { ...this.state.fishes };

    // add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // set new state
    this.setState({ fishes }); // same as fishes: fishes
  };

  updateFish = (key, updatedFish) => {
    //take copy of current state
    const fishes = { ...this.state.fishes };

    //update state
    fishes[key] = updatedFish;

    //set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // take copy of state
    const fishes = { ...this.state.fishes };
    // remove fish from state

    fishes[key] = null;

    // update fish
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // copy state
    const order = { ...this.state.order };

    // add or update order
    order[key] = order[key] + 1 || 1;
    // call setstate to update the state
    this.setState({ order });
  };

  removeFromOrder = key => {
    // copy state
    const order = { ...this.state.order };

    // remove item from order
    delete order[key];
    // call setstate to update the state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
