import React from 'react';
import ExpensesListItem from './ExpensesListItem';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';

const ExpensesList = (props) => (
    <div>
      <h1>Expenses List</h1>
      {props.expenses.map((expense)=>{
        return <ExpensesListItem key={expense.id} {...expense}/>
      })}
      
      
    </div>
  );  

  const mapStateToProps =  (state)=>{

    return {
      expenses:selectExpenses(state.expenses,state.filters)
    };
  
  };

  export default connect(mapStateToProps)(ExpensesList);


