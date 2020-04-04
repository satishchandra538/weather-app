import React from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <div className="logo"><span className="logo1">Weather</span> App</div>
            <form onSubmit={props.searchcity}>
                <input type="text" placeholder="Search your city" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default Header;