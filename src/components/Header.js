import React from 'react';

/*
    If you dont need other methods other than render
    you dont need an entire react component
    instead use a stateless functional component like this:
    function Header {(code)} OR like below

    Component that renders the header
*/
    const Header  = (props) => {
        return(
            <header className="top">
                <h1>
                    Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                    Day
                </h1>
                <h3 className="tagline"><span>{props.tagline}</span></h3>
            </header>
        )
    }

Header.propTypes = {
    tagline: React.PropTypes.string.isRequired
}
        

export default Header;