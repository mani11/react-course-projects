import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Expensify</h1>
      <NavLink exact activeClassName="is-active" to="/">Dashboard</NavLink>
      <NavLink activeClassName="is-active" to="/create">Create Expense</NavLink>
    </header>
  )
}

export default Header;
