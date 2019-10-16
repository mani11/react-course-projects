import React from "react";
import ExpenseFilter from './ExpenseFilter';
import ExpensesList from "./ExpensesList";


const ExpensifyDashboard = () => {
  return(
    <div>
      <p>Welcome to expensify app</p>
      <ExpenseFilter />
      <ExpensesList />
    </div>
  )
}

export default ExpensifyDashboard;