import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import ExpensifyDashboard from "../components/ExpensifyDashboard";
import CreateExpense from "../components/CreateExpense";
import NotFound from "../components/PageNotFound";
import Header from "../components/Header";
import EditExpense from "../components/EditExpense";

const Router = ()=>{
  
  return(
  <BrowserRouter>
  <div>
  <Header />
    <Switch>
      <Route exact path="/" component={ExpensifyDashboard}></Route>
      <Route path="/create" component={CreateExpense}></Route>
      <Route path="/edit/:id" component={EditExpense}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </div>  
  </BrowserRouter>
  )
}

export default Router
