import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./routers/AppRouter";
import { Provider } from "react-redux";
import configStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters"
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';

// console.log(store);
const store = configStore();
store.dispatch(addExpense({description:"Water Bill",amount:100,createAt:4}));
store.dispatch(addExpense({description:"Gas Bill",amount:80,createAt:1}));
store.dispatch(addExpense({description:"Rent",amount:2500,createAt:2}));
//store.dispatch(setTextFilter("water"));
const state = store.getState();
console.log(state);
console.log(getVisibleExpenses(state.expenses,state.filters));

const app = (
  <Provider store={ store }>
      <Router/>
  </Provider>
)

ReactDOM.render(app,document.getElementById("app-root"));