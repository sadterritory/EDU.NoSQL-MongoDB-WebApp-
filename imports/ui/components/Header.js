import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"

export const Header = ({ user }) => {
    return (
        <div className="header-container">
            <header>
                <Link to="/customers" className="header-link">Customers</Link>
                <Link to="/orders" className="header-link">Orders</Link>
                <Link to="/books" className="header-link">Books</Link>
                <Link to="/bookAuthors" className="header-link">Book-authors</Link>
                <Link to="/writers" className="header-link">Writers</Link>
                <Link to="/contracts" className="header-link">Contracts</Link>
                <Link to="/users" className="header-link">Users</Link>
            </header>
            <div className="logout-container">
                {user ? <button className="logout-button" onClick={Meteor.logout}>Logout</button> : null}
            </div>
        </div>
    );
}