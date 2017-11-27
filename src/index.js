// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// style
import './css/style.css';

// components
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// react router
const Root = () => {
    return (
        <BrowserRouter>
        {/* when on homepage which component should be shown*/}
            <div>
                <Match exactly pattern="/" component={StorePicker}/>
                <Match pattern="/store/:storeId" component={App}/>
                <Miss component={NotFound}/>
            </div>
        </BrowserRouter>
    )
}
render(<Root/>, document.querySelector('#main'));


