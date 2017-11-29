import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';


class Inventory extends React.Component {
    constructor() {
        super();

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount() {
        // listen for authentication
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, {user});
            }
        })
    }

    handleChange(e, key) { 
        const fish = this.props.fishes[key];
        //take copy of fish and update with new data
        const updatedFish = {
            ...fish, 
            [e.target.name]: e.target.value //inputs and select field (overwrite old value)
        }
        this.props.updateFish(key, updatedFish);
    }

    authenticate(provider) {
        console.log(provider);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout() {
        // log out of firebase
        base.unauth();

        this.setState({ uid: null })
    }

    authHandler(err, authData) {
        if(err) {
            console.error(err);
            return;
        }

        // grab store info
        const storeRef = base.database().ref(this.props.storeId);

        //query the firebase once for the store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            // claim as own if no owner already
            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        });
    }

    // login buttons
    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with FaceBook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
            </nav>
        )
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name}placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="price" value={fish.price}placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
                <select name="status" value={fish.status}placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc}placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input type="text" name="image" value={fish.image}placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>
        
        // check if they are not logged in
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        // check if uid is owner of store
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you arent the owner of this store!</p>
                    {logout}
                </div>
            )
        }
        return(
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                {/* Pass function down to AddFishForm */}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample fishes</button>
            </div>
            
        )
    }
}

Inventory.propTypes = {
    updateFish: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
}

export default Inventory;